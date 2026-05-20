import { Transaction } from "@mysten/sui/transactions";

export type CivilizationMintInput = {
  name: string;
  symbol: string;
  aggression: number;
  stability: number;
  lore: string;
  walrusRef: string;
  recipient: string;
};

export type RecordEventInput = {
  civilizationId: string; // Onchain object ID of the civilization
  eventType: number; // u8: 0=PROPAGANDA, 1=RECRUIT, 2=ALLIANCE, 3=ATTACK, 4=RITUAL, 5=EVOLUTION, 6=EXPAND, 7=BETRAY, 8=CREATE, 9=VOTE, 10=WAR_RESULT, 11=WORLD
  eventHash: string; // Hash/content of the event
  recipient: string;
};

export type FormAllianceInput = {
  civilizationA: string; // Onchain object ID
  civilizationB: string; // Onchain object ID
  strength: number; // u64
  recipient: string;
};

export type RecordWarInput = {
  attacker: string; // Onchain object ID
  defender: string; // Onchain object ID
  result: number; // u8: 0=draw, 1=attacker_won, 2=defender_won
  influenceChange: number; // u64
  attackerWon: boolean;
  recipient: string;
};

const textEncoder = new TextEncoder();

export const suiPackageId = import.meta.env.VITE_SUI_PACKAGE_ID ?? "";

export function hasPublishedPackage() {
  const packageId = import.meta.env.VITE_SUI_PACKAGE_ID ?? "";
  return packageId.startsWith("0x") && packageId.length > 10;
}

export function buildCreateCivilizationTransaction(input: CivilizationMintInput) {
  if (!hasPublishedPackage()) {
    throw new Error(
      "Missing VITE_SUI_PACKAGE_ID. Publish the Move package and set the package id first.",
    );
  }

  const tx = new Transaction();
  const [civilization] = tx.moveCall({
    target: `${suiPackageId}::civilization::create_civilization`,
    arguments: [
      tx.pure.string(input.name),
      tx.pure.string(input.symbol),
      tx.pure.u8(input.aggression),
      tx.pure.u8(input.stability),
      tx.pure.vector("u8", Array.from(textEncoder.encode(input.lore))),
      tx.pure.vector("u8", Array.from(textEncoder.encode(input.walrusRef))),
      tx.object.clock(),
    ],
  });

  tx.transferObjects([civilization], input.recipient);

  return tx;
}

export function buildRecordEventTransaction(input: RecordEventInput) {
  if (!hasPublishedPackage()) {
    throw new Error("Missing VITE_SUI_PACKAGE_ID");
  }

  const tx = new Transaction();
  const [event] = tx.moveCall({
    target: `${suiPackageId}::civilization::record_event`,
    arguments: [
      tx.pure.id(input.civilizationId),
      tx.pure.u8(input.eventType),
      tx.pure.vector("u8", Array.from(textEncoder.encode(input.eventHash))),
      tx.object.clock(),
    ],
  });

  tx.transferObjects([event], input.recipient);

  return tx;
}

export function buildFormAllianceTransaction(input: FormAllianceInput) {
  if (!hasPublishedPackage()) {
    throw new Error("Missing VITE_SUI_PACKAGE_ID");
  }

  const tx = new Transaction();
  const [alliance] = tx.moveCall({
    target: `${suiPackageId}::civilization::form_alliance`,
    arguments: [
      tx.pure.id(input.civilizationA),
      tx.pure.id(input.civilizationB),
      tx.pure.u64(input.strength),
      tx.object.clock(),
    ],
  });

  tx.transferObjects([alliance], input.recipient);

  return tx;
}

export function buildRecordWarTransaction(input: RecordWarInput) {
  if (!hasPublishedPackage()) {
    throw new Error("Missing VITE_SUI_PACKAGE_ID");
  }

  const tx = new Transaction();
  const [war] = tx.moveCall({
    target: `${suiPackageId}::civilization::record_war`,
    arguments: [
      tx.pure.id(input.attacker),
      tx.pure.id(input.defender),
      tx.pure.u8(input.result),
      tx.pure.u64(input.influenceChange),
      tx.pure.bool(input.attackerWon),
      tx.object.clock(),
    ],
  });

  tx.transferObjects([war], input.recipient);

  return tx;
}

// Helper to extract created MemeCivilization object ID from transaction result
export function extractCreatedObjectId(
  result: { created?: Array<{ objectId: string; objectType: string }> },
  targetType: string = "MemeCivilization",
): string | undefined {
  const created = result.created?.find((obj) => obj.objectType.includes(targetType));
  return created?.objectId;
}
