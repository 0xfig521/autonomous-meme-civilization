import { describe, expect, it } from "vite-plus/test";
import {
  buildCreateCivilizationTransaction,
  buildRecordEventTransaction,
  buildFormAllianceTransaction,
  buildRecordWarTransaction,
  hasPublishedPackage,
} from "./chain";

describe("Sui transaction adapter", () => {
  it("builds a create_civilization transaction when the package id is configured", () => {
    expect(hasPublishedPackage()).toBe(true);

    const transaction = buildCreateCivilizationTransaction({
      name: "Green Candle Cult",
      symbol: "$CANDLE",
      aggression: 74,
      stability: 42,
      lore: "The cult treats green candles as doctrine.",
      walrusRef: "walrus://lore/green-candle-cult",
      recipient: "0x366c943c11a541396fe586f8179a6fd1c237064b9bfd44cb7efd7255dad91314",
    });

    expect(transaction).toBeDefined();
  });

  it("builds a record_event transaction when the package id is configured", () => {
    const transaction = buildRecordEventTransaction({
      civilizationId: "0x123abc",
      eventType: 0,
      eventHash: "propaganda event",
      recipient: "0x366c943c11a541396fe586f8179a6fd1c237064b9bfd44cb7efd7255dad91314",
    });

    expect(transaction).toBeDefined();
  });

  it("builds a form_alliance transaction when the package id is configured", () => {
    const transaction = buildFormAllianceTransaction({
      civilizationA: "0x123abc",
      civilizationB: "0x456def",
      strength: 100,
      recipient: "0x366c943c11a541396fe586f8179a6fd1c237064b9bfd44cb7efd7255dad91314",
    });

    expect(transaction).toBeDefined();
  });

  it("builds a record_war transaction when the package id is configured", () => {
    const transaction = buildRecordWarTransaction({
      attacker: "0x123abc",
      defender: "0x456def",
      result: 1,
      influenceChange: 50,
      attackerWon: true,
      recipient: "0x366c943c11a541396fe586f8179a6fd1c237064b9bfd44cb7efd7255dad91314",
    });

    expect(transaction).toBeDefined();
  });
});
