import { useEffect, useMemo, useRef, useState } from "react";
import { useWallet } from "./wallet";
import {
  buildCreateCivilizationTransaction,
  buildFormAllianceTransaction,
  buildRecordWarTransaction,
  extractCreatedObjectId,
  hasPublishedPackage,
  suiPackageId,
} from "./chain";
import { useI18n } from "./i18n";
import { useGenerateCiv } from "./composables/useGenerateCiv";
import { useWalrusUpload } from "./composables/useWalrusUpload";
import { Toaster, toast } from "sonner";
import "./App.css";

type Mood = "hungry" | "euphoric" | "paranoid" | "ritualistic" | "vengeful";
type Personality = "chaotic" | "greedy" | "poetic" | "aggressive" | "diplomatic" | "paranoid";
type ActionKind =
  | "PROPAGANDA"
  | "RECRUIT"
  | "ALLIANCE"
  | "ATTACK"
  | "RITUAL"
  | "EVOLUTION"
  | "EXPAND"
  | "BETRAY";

type Civilization = {
  id: string;
  name: string;
  symbol: string;
  slogan: string;
  lore: string;
  personality: Personality[];
  colors: [string, string];
  followers: number;
  influence: number;
  treasury: number;
  aggression: number;
  stability: number;
  reputation: number;
  level: number;
  mood: Mood;
  alliances: string[];
  enemies: string[];
  wins: number;
  losses: number;
  walrusRef: string;
  suiObjectId: string;
  coordinates: { x: number; y: number };
};

type WorldEvent = {
  id: string;
  at: string;
  type: ActionKind | "CREATE" | "VOTE" | "WAR_RESULT" | "WORLD";
  title: string;
  body: string;
  civId?: string;
  targetId?: string;
  onchainRef: string;
};

type WarState = {
  id: string;
  attackerId: string;
  defenderId: string;
  attackerScore: number;
  defenderScore: number;
  progress: number;
  declaration: string;
  result?: string;
};

type WorldState = {
  chaos: number;
  memeTrend: string;
  allianceDensity: number;
  warFrequency: number;
  marketMood: "bullish" | "bearish" | "feral";
};

function actionLabels(t: ReturnType<typeof useI18n>["t"]): Record<ActionKind, string> {
  return {
    PROPAGANDA: t("actions.PROPAGANDA"),
    RECRUIT: t("actions.RECRUIT"),
    ALLIANCE: t("actions.ALLIANCE"),
    ATTACK: t("actions.ATTACK"),
    RITUAL: t("actions.RITUAL"),
    EVOLUTION: t("actions.EVOLUTION"),
    EXPAND: t("actions.EXPAND"),
    BETRAY: t("actions.BETRAY"),
  };
}

const moods: Mood[] = ["hungry", "euphoric", "paranoid", "ritualistic", "vengeful"];
const trends = [
  "Frog Meta Rising",
  "Cult Rebellion",
  "Cat Liquidity Panic",
  "Green Candle Prophecy",
  "Dog Kingdom Rally",
];

const initialCivilizations: Civilization[] = [
  {
    id: "civ-frog",
    name: "Green Candle Cult",
    symbol: "$CANDLE",
    slogan: "We only go up.",
    lore: "A frog sect that treats every green wick as a divine market signal and every red candle as cowardice.",
    personality: ["chaotic", "greedy", "poetic"],
    colors: ["#65f28a", "#0e6b4a"],
    followers: 132,
    influence: 61,
    treasury: 1280,
    aggression: 74,
    stability: 42,
    reputation: 8,
    level: 2,
    mood: "ritualistic",
    alliances: [],
    enemies: ["civ-cat"],
    wins: 1,
    losses: 0,
    walrusRef: "walrus://lore/green-candle-cult",
    suiObjectId: "0x7ac...candle",
    coordinates: { x: 31, y: 57 },
  },
  {
    id: "civ-cat",
    name: "Cat Empire",
    symbol: "$MEOW",
    slogan: "All liquidity naps beneath us.",
    lore: "A sleek empire of soft-pawed strategists, famous for diplomacy until someone touches the treasury bowl.",
    personality: ["diplomatic", "greedy", "paranoid"],
    colors: ["#f5c86b", "#7c4b10"],
    followers: 165,
    influence: 72,
    treasury: 1510,
    aggression: 48,
    stability: 68,
    reputation: 12,
    level: 3,
    mood: "paranoid",
    alliances: ["civ-dog"],
    enemies: ["civ-frog"],
    wins: 2,
    losses: 1,
    walrusRef: "walrus://lore/cat-empire",
    suiObjectId: "0x94b...meow",
    coordinates: { x: 62, y: 37 },
  },
  {
    id: "civ-dog",
    name: "Dog Kingdom",
    symbol: "$BARK",
    slogan: "Fetch the future.",
    lore: "An honor-bound pack that believes loyalty is a consensus algorithm and raids are solved by enthusiasm.",
    personality: ["aggressive", "diplomatic"],
    colors: ["#70b7ff", "#173a71"],
    followers: 118,
    influence: 54,
    treasury: 980,
    aggression: 66,
    stability: 57,
    reputation: 5,
    level: 2,
    mood: "hungry",
    alliances: ["civ-cat"],
    enemies: [],
    wins: 0,
    losses: 1,
    walrusRef: "walrus://lore/dog-kingdom",
    suiObjectId: "0x42d...bark",
    coordinates: { x: 76, y: 68 },
  },
];

const initialEvents: WorldEvent[] = [
  {
    id: "evt-0",
    at: "00:00",
    type: "WORLD",
    title: "World boot sequence complete",
    body: "Three autonomous meme civilizations are now competing for Sui influence.",
    onchainRef: "0xworld...000",
  },
  {
    id: "evt-1",
    at: "00:12",
    type: "ALLIANCE",
    title: "Cat Empire forms a soft alliance",
    body: "Dog Kingdom accepts a treaty written entirely in snack metaphors.",
    civId: "civ-cat",
    targetId: "civ-dog",
    onchainRef: "0xalli...catdog",
  },
  {
    id: "evt-2",
    at: "00:31",
    type: "PROPAGANDA",
    title: "Green Candle prophecy spreads",
    body: "The cult announces that red candles are simply green candles in denial.",
    civId: "civ-frog",
    onchainRef: "0xevent...candle",
  },
];

const startingWorld: WorldState = {
  chaos: 46,
  memeTrend: "Frog Meta Rising",
  allianceDensity: 34,
  warFrequency: 28,
  marketMood: "feral",
};

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function timeStamp(locale = "en") {
  return new Intl.DateTimeFormat(locale, {
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function createObjectRef(seed: string) {
  return `0x${seed
    .replaceAll(/[^a-z0-9]/gi, "")
    .toLowerCase()
    .slice(0, 5)
    .padEnd(5, "0")}...${Math.random().toString(16).slice(2, 8)}`;
}

function chooseAction(civ: Civilization, world: WorldState): ActionKind {
  if (civ.aggression + world.chaos > 132) {
    return "ATTACK";
  }
  if (civ.stability < 35) {
    return "RITUAL";
  }
  if (civ.followers < 120) {
    return "RECRUIT";
  }
  return pick(["PROPAGANDA", "EXPAND", "ALLIANCE", "EVOLUTION", "BETRAY"]);
}

function describeAction(
  t: ReturnType<typeof useI18n>["t"],
  action: ActionKind,
  civ: Civilization,
  target?: Civilization,
) {
  switch (action) {
    case "PROPAGANDA":
      return t("describeAction.PROPAGANDA", { name: civ.name, slogan: civ.slogan });
    case "RECRUIT":
      return t("describeAction.RECRUIT", { name: civ.name });
    case "ALLIANCE":
      return target
        ? t("describeAction.ALLIANCE_TARGET", { name: civ.name, target: target.name })
        : t("describeAction.ALLIANCE", { name: civ.name });
    case "ATTACK":
      return target
        ? t("describeAction.ATTACK_TARGET", { name: civ.name, target: target.name })
        : t("describeAction.ATTACK", { name: civ.name });
    case "RITUAL":
      return t("describeAction.RITUAL", { name: civ.name });
    case "EVOLUTION":
      return t("describeAction.EVOLUTION", { name: civ.name });
    case "EXPAND":
      return t("describeAction.EXPAND", { name: civ.name });
    case "BETRAY":
      return target
        ? t("describeAction.BETRAY_TARGET", { name: civ.name, target: target.name })
        : t("describeAction.BETRAY", { name: civ.name });
  }
}

function scoreWar(civ: Civilization, supportBonus: number) {
  return (
    civ.followers * 0.36 +
    civ.influence * 1.7 +
    civ.treasury * 0.035 +
    civ.aggression * 0.9 +
    supportBonus
  );
}

function App() {
  const { t, locale, toggleLocale } = useI18n();
  const wallet = useWallet();
  const { completion, input, handleInputChange, handleSubmit, isLoading, error } = useGenerateCiv();
  const { upload: uploadToWalrus, loading: _walrusLoading, error: walrusError } = useWalrusUpload();
  const [civilizations, setCivilizations] = useState(initialCivilizations);
  const [events, setEvents] = useState(initialEvents);
  const [world, setWorld] = useState(startingWorld);
  const [selectedId, setSelectedId] = useState(initialCivilizations[0].id);
  const [communitySupport, setCommunitySupport] = useState<Record<string, number>>({
    "civ-frog": 22,
    "civ-cat": 12,
    "civ-dog": 8,
  });
  const [activeWar, setActiveWar] = useState<WarState | undefined>();
  const [chainStatus, setChainStatus] = useState(t("arena.chainConsole.statusReady"));
  const civilizationsRef = useRef(civilizations);
  const worldRef = useRef(world);
  const tRef = useRef(t);
  const localeRef = useRef(locale);
  const finalizedWarIdsRef = useRef(new Set<string>());

  useEffect(() => {
    tRef.current = t;
  }, [t]);
  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  const selectedCivilization = useMemo(
    () => civilizations.find((civilization) => civilization.id === selectedId) ?? civilizations[0],
    [civilizations, selectedId],
  );

  const leader = useMemo(
    () =>
      [...civilizations].sort((a, b) => b.influence + b.followers - (a.influence + a.followers))[0],
    [civilizations],
  );

  useEffect(() => {
    civilizationsRef.current = civilizations;
  }, [civilizations]);

  useEffect(() => {
    worldRef.current = world;
  }, [world]);

  useEffect(() => {
    if (error) {
      toast.error(t("event.createError") || "Failed to create civilization");
    }
  }, [error, t]);

  useEffect(() => {
    if (walrusError) {
      toast.error("Failed to upload to Walrus, using local reference");
    }
  }, [walrusError]);

  useEffect(() => {
    if (completion && !isLoading) {
      try {
        const civilization = JSON.parse(completion) as Civilization;

        if (wallet.connection.account) {
          uploadToWalrus(
            {
              name: civilization.name,
              symbol: civilization.symbol,
              slogan: civilization.slogan,
              lore: civilization.lore,
              personality: civilization.personality,
              colors: civilization.colors,
            },
            wallet.connection.account
              .address as unknown as import("@mysten/sui/cryptography").Signer,
          )
            .then((blobId) => {
              civilization.walrusRef = blobId;
            })
            .catch(() => {
              civilization.walrusRef = `walrus://mock/${civilization.id}`;
            });
        } else {
          civilization.walrusRef = `walrus://mock/${civilization.id}`;
        }

        setCivilizations((existing) => [civilization, ...existing]);
        setCommunitySupport((existing) => ({ ...existing, [civilization.id]: 0 }));
        setSelectedId(civilization.id);
        addEvent({
          type: "CREATE",
          title: t("event.createTitle", { name: civilization.name }),
          body: t("event.createBody", { symbol: civilization.symbol }),
          civId: civilization.id,
        });
      } catch {
        toast.error(t("event.parseError") || "Failed to parse civilization data");
      }
    }
  }, [completion, isLoading, t, wallet.connection.account, uploadToWalrus]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = civilizationsRef.current;
      const currT = tRef.current;
      const currLocale = localeRef.current;

      if (current.length < 1) {
        return;
      }

      const actor = pick(current);
      const target = pick(current.filter((civilization) => civilization.id !== actor.id));
      const action = chooseAction(actor, worldRef.current);
      const labels = actionLabels(currT);
      const followersDelta =
        action === "RECRUIT" ? 18 : action === "ATTACK" ? 9 : action === "RITUAL" ? 4 : 7;
      const influenceDelta =
        action === "EXPAND" || action === "PROPAGANDA" ? 8 : action === "ATTACK" ? 5 : 3;

      setEvents((existing) =>
        [
          {
            id: makeId("evt"),
            at: timeStamp(currLocale),
            type: action,
            title: `${actor.name} chooses ${labels[action]}`,
            body: describeAction(currT, action, actor, target),
            civId: actor.id,
            targetId: target?.id,
            onchainRef: createObjectRef(action),
          },
          ...existing,
        ].slice(0, 16),
      );

      setWorld((snapshot) => ({
        chaos: clamp(snapshot.chaos + (action === "ATTACK" || action === "BETRAY" ? 5 : -1)),
        memeTrend: Math.random() > 0.72 ? pick(trends) : snapshot.memeTrend,
        allianceDensity: clamp(
          snapshot.allianceDensity + (action === "ALLIANCE" ? 6 : action === "BETRAY" ? -7 : 0),
        ),
        warFrequency: clamp(snapshot.warFrequency + (action === "ATTACK" ? 7 : -1)),
        marketMood: snapshot.chaos > 70 ? "feral" : snapshot.chaos < 30 ? "bearish" : "bullish",
      }));

      setCivilizations((existing) =>
        existing.map((civilization) => {
          if (civilization.id !== actor.id) {
            return civilization;
          }

          return {
            ...civilization,
            followers: civilization.followers + followersDelta,
            influence: clamp(civilization.influence + influenceDelta, 0, 999),
            treasury: civilization.treasury + (action === "RITUAL" ? -40 : 45),
            stability: clamp(
              civilization.stability + (action === "RITUAL" ? 9 : action === "BETRAY" ? -10 : 1),
            ),
            aggression: clamp(
              civilization.aggression + (action === "ATTACK" ? 4 : action === "ALLIANCE" ? -3 : 1),
            ),
            reputation: civilization.reputation + (action === "PROPAGANDA" ? 2 : 1),
            mood: pick(moods),
            level:
              civilization.influence > civilization.level * 35
                ? civilization.level + 1
                : civilization.level,
          };
        }),
      );
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeWar) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      const currT = tRef.current;
      const currLocale = localeRef.current;
      setActiveWar((current) => {
        if (!current) {
          return undefined;
        }

        const nextProgress = Math.min(100, current.progress + 12);
        if (nextProgress < 100) {
          return {
            ...current,
            attackerScore: current.attackerScore + Math.floor(Math.random() * 13),
            defenderScore: current.defenderScore + Math.floor(Math.random() * 13),
            progress: nextProgress,
          };
        }

        const attackerWins = current.attackerScore >= current.defenderScore;
        const winnerId = attackerWins ? current.attackerId : current.defenderId;
        const loserId = attackerWins ? current.defenderId : current.attackerId;
        const winner = civilizationsRef.current.find(
          (civilization) => civilization.id === winnerId,
        );
        const loser = civilizationsRef.current.find((civilization) => civilization.id === loserId);
        const result =
          winner && loser
            ? currT("event.warResultBody", { winner: winner.name, loser: loser.name })
            : currT("event.warResolved");

        if (!finalizedWarIdsRef.current.has(current.id)) {
          finalizedWarIdsRef.current.add(current.id);
          setCivilizations((existing) =>
            existing.map((civilization) => {
              if (civilization.id === winnerId) {
                return {
                  ...civilization,
                  followers: civilization.followers + 24,
                  influence: clamp(civilization.influence + 14, 0, 999),
                  reputation: civilization.reputation + 9,
                  wins: civilization.wins + 1,
                };
              }
              if (civilization.id === loserId) {
                return {
                  ...civilization,
                  followers: Math.max(10, civilization.followers - 20),
                  influence: clamp(civilization.influence - 11, 0, 999),
                  treasury: Math.max(0, civilization.treasury - 130),
                  losses: civilization.losses + 1,
                  mood: "paranoid",
                };
              }
              return civilization;
            }),
          );
          setEvents((existing) =>
            [
              {
                id: makeId("evt"),
                at: timeStamp(currLocale),
                type: "WAR_RESULT" as const,
                title: currT("event.warResultTitle"),
                body: result,
                civId: winnerId,
                targetId: loserId,
                onchainRef: createObjectRef("war"),
              },
              ...existing,
            ].slice(0, 16),
          );
          setWorld((snapshot) => ({
            ...snapshot,
            chaos: clamp(snapshot.chaos + 9),
            warFrequency: clamp(snapshot.warFrequency + 11),
          }));
        }

        return {
          ...current,
          progress: 100,
          result,
        };
      });
    }, 700);

    return () => window.clearInterval(timer);
  }, [activeWar]);

  function addEvent(event: Omit<WorldEvent, "id" | "at" | "onchainRef">) {
    setEvents((existing) =>
      [
        {
          id: makeId("evt"),
          at: timeStamp(localeRef.current),
          onchainRef: createObjectRef(event.type),
          ...event,
        },
        ...existing,
      ].slice(0, 16),
    );
  }

  async function handleCreateCivilization(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) {
      return;
    }
    try {
      handleSubmit(e);
    } catch {
      toast.error(t("event.createError") || "Failed to create civilization");
    }
  }

  async function mintSelectedOnSui() {
    if (!wallet.connection.account) {
      setChainStatus(t("arena.chainConsole.statusNotConnected"));
      return;
    }

    if (!hasPublishedPackage()) {
      setChainStatus(t("arena.chainConsole.statusNoPackage"));
      return;
    }

    setChainStatus(
      t("arena.chainConsole.statusSubmitting", {
        symbol: selectedCivilization.symbol,
        network: wallet.network,
      }),
    );

    try {
      const transaction = buildCreateCivilizationTransaction({
        name: selectedCivilization.name,
        symbol: selectedCivilization.symbol,
        aggression: selectedCivilization.aggression,
        stability: selectedCivilization.stability,
        lore: selectedCivilization.lore,
        walrusRef: selectedCivilization.walrusRef,
        recipient: wallet.connection.account.address,
      });
      const result = await wallet.dAppKit!.signAndExecuteTransaction({ transaction });

      const objectId = extractCreatedObjectId(
        result as unknown as { created?: Array<{ objectId: string; objectType: string }> },
        "MemeCivilization",
      );
      const digest =
        (result as { Transaction?: { digest?: string } }).Transaction?.digest ??
        "transaction accepted";

      setCivilizations((existing) =>
        existing.map((civilization) =>
          civilization.id === selectedCivilization.id
            ? {
                ...civilization,
                suiObjectId: objectId ?? digest,
              }
            : civilization,
        ),
      );
      addEvent({
        type: "CREATE",
        title: t("event.submitTitle", { name: selectedCivilization.name, network: wallet.network }),
        body: objectId
          ? `Created onchain object: ${objectId.slice(0, 16)}...`
          : t("event.submitBody", { address: wallet.connection.account.address.slice(0, 8) }),
        civId: selectedCivilization.id,
      });
      setChainStatus(
        objectId
          ? `Object created: ${objectId.slice(0, 16)}...`
          : t("arena.chainConsole.statusComplete", { digest }),
      );
    } catch (error) {
      setChainStatus(error instanceof Error ? error.message : t("arena.chainConsole.statusFailed"));
    }
  }

  async function handleFormAlliance() {
    if (!wallet.connection.account) {
      toast.error(t("arena.chainConsole.statusNotConnected"));
      return;
    }

    if (!hasPublishedPackage()) {
      toast.error(t("arena.chainConsole.statusNoPackage"));
      return;
    }

    if (
      !selectedCivilization.suiObjectId.startsWith("0x") ||
      selectedCivilization.suiObjectId.includes("...")
    ) {
      toast.error("Selected civilization must be minted to chain first");
      return;
    }

    const target = civilizations.find(
      (c) =>
        c.id !== selectedCivilization.id &&
        c.suiObjectId.startsWith("0x") &&
        !c.suiObjectId.includes("..."),
    );

    if (!target) {
      toast.error("No other minted civilization available for alliance");
      return;
    }

    try {
      const transaction = buildFormAllianceTransaction({
        civilizationA: selectedCivilization.suiObjectId,
        civilizationB: target.suiObjectId,
        strength: 50 + Math.floor(Math.random() * 50),
        recipient: wallet.connection.account.address,
      });
      const result = await wallet.dAppKit!.signAndExecuteTransaction({ transaction });
      const digest =
        (result as { Transaction?: { digest?: string } }).Transaction?.digest ?? "alliance formed";

      addEvent({
        type: "ALLIANCE",
        title: `${selectedCivilization.name} forms alliance with ${target.name}`,
        body: `Alliance recorded onchain: ${digest.slice(0, 16)}...`,
        civId: selectedCivilization.id,
        targetId: target.id,
      });

      toast.success(`Alliance with ${target.name} recorded onchain`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to form alliance");
    }
  }

  async function handleRecordWar() {
    if (!wallet.connection.account) {
      toast.error(t("arena.chainConsole.statusNotConnected"));
      return;
    }

    if (!hasPublishedPackage()) {
      toast.error(t("arena.chainConsole.statusNoPackage"));
      return;
    }

    if (!activeWar?.result) {
      toast.error("No resolved war to record");
      return;
    }

    const attacker = civilizations.find((c) => c.id === activeWar.attackerId);
    const defender = civilizations.find((c) => c.id === activeWar.defenderId);

    if (!attacker || !defender) {
      toast.error("War participants not found");
      return;
    }

    if (
      !attacker.suiObjectId.startsWith("0x") ||
      attacker.suiObjectId.includes("...") ||
      !defender.suiObjectId.startsWith("0x") ||
      defender.suiObjectId.includes("...")
    ) {
      toast.error("Both civilizations must be minted to chain first");
      return;
    }

    const attackerWon = activeWar.attackerScore >= activeWar.defenderScore;

    try {
      const transaction = buildRecordWarTransaction({
        attacker: attacker.suiObjectId,
        defender: defender.suiObjectId,
        result: attackerWon ? 1 : 2,
        influenceChange: Math.abs(attacker.influence - defender.influence),
        attackerWon,
        recipient: wallet.connection.account.address,
      });
      const result = await wallet.dAppKit!.signAndExecuteTransaction({ transaction });
      const digest =
        (result as { Transaction?: { digest?: string } }).Transaction?.digest ?? "war recorded";

      addEvent({
        type: "WAR_RESULT",
        title: `${attackerWon ? attacker.name : defender.name} victory recorded`,
        body: `War result recorded onchain: ${digest.slice(0, 16)}...`,
        civId: activeWar.attackerId,
        targetId: activeWar.defenderId,
      });

      toast.success("War result recorded onchain");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to record war");
    }
  }

  function voteFor(action: ActionKind) {
    const civilization = selectedCivilization;
    setCommunitySupport((existing) => ({
      ...existing,
      [civilization.id]: (existing[civilization.id] ?? 0) + 8,
    }));
    setCivilizations((existing) =>
      existing.map((candidate) =>
        candidate.id === civilization.id
          ? {
              ...candidate,
              aggression: clamp(candidate.aggression + (action === "ATTACK" ? 8 : 2)),
              influence: clamp(candidate.influence + (action === "PROPAGANDA" ? 7 : 3), 0, 999),
              mood: action === "RITUAL" ? "ritualistic" : candidate.mood,
            }
          : candidate,
      ),
    );
    addEvent({
      type: "VOTE",
      title: t("event.voteTitle", { name: civilization.name, action: actionLabels(t)[action] }),
      body: t("event.voteBody", {
        action: actionLabels(t)[action].toLowerCase(),
        symbol: civilization.symbol,
      }),
      civId: civilization.id,
    });
  }

  function startWar(attacker: Civilization) {
    const defender =
      civilizations
        .filter((civilization) => civilization.id !== attacker.id)
        .sort((a, b) => b.influence + b.followers - (a.influence + a.followers))[0] ??
      civilizations[0];
    const support = communitySupport[attacker.id] ?? 0;
    const defenderSupport = communitySupport[defender.id] ?? 0;
    const warDeclarations = [t("warDeclaration.0"), t("warDeclaration.1"), t("warDeclaration.2")];
    setActiveWar({
      id: makeId("war"),
      attackerId: attacker.id,
      defenderId: defender.id,
      attackerScore: Math.round(scoreWar(attacker, support)),
      defenderScore: Math.round(scoreWar(defender, defenderSupport)),
      progress: 4,
      declaration: `${attacker.name}: ${pick(warDeclarations)}`,
    });
    addEvent({
      type: "ATTACK",
      title: t("event.attackTitle", { name: attacker.name }),
      body: t("event.attackBody", { symbol: attacker.symbol, target: defender.name }),
      civId: attacker.id,
      targetId: defender.id,
    });
  }

  return (
    <main className="app-shell">
      <nav className="landing-nav" aria-label="Primary navigation">
        <a className="nav-brand" href="#top">
          AMC
        </a>
        <div className="nav-links">
          <a href="#world">{t("nav.world")}</a>
          <a href="#loop">{t("nav.gameplay")}</a>
          <a href="#onchain">{t("nav.sui")}</a>
        </div>
        <div className="nav-controls">
          <button type="button" className="lang-toggle" onClick={toggleLocale}>
            {locale === "en" ? "中文" : "EN"}
          </button>
          <a className="nav-cta" href="#arena">
            {t("nav.enterArena")}
          </a>
        </div>
      </nav>

      <section className="landing-hero" id="top">
        <div className="hero-field" aria-hidden="true">
          <span className="territory-ring ring-a" />
          <span className="territory-ring ring-b" />
          <span className="territory-ring ring-c" />
          <span className="signal-route route-a" />
          <span className="signal-route route-b" />
          <span className="signal-route route-c" />
          <span className="faction-node hero-candle">$CANDLE</span>
          <span className="faction-node hero-doge">$DOGE</span>
          <span className="faction-node hero-cat">$CAT</span>
          <span className="world-chip chip-chaos">chaos {world.chaos}</span>
          <span className="world-chip chip-trend">{world.memeTrend}</span>
        </div>

        <div className="hero-signal">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
          <div className="hero-actions">
            <a className="hero-primary" href="#arena">
              {t("hero.enterArena")}
            </a>
            <a className="hero-secondary" href="#onchain">
              {t("hero.readOnchain")}
            </a>
          </div>
        </div>

        <aside className="hero-status-rail" aria-label="Current world status">
          <div>
            <span>{t("heroStatus.leadingFaction")}</span>
            <strong>{leader?.name ?? "Green Candle Cult"}</strong>
          </div>
          <div>
            <span>{t("heroStatus.worldMood")}</span>
            <strong>{t(`marketMood.${world.marketMood}`)}</strong>
          </div>
          <div>
            <span>{t("heroStatus.eventStream")}</span>
            <strong>
              {events.length} {t("heroStatus.logs")}
            </strong>
          </div>
        </aside>
      </section>

      <section className="landing-proof" id="world">
        <article className="proof-item">
          <span>{t("proof.items.0.num")}</span>
          <strong>{t("proof.items.0.title")}</strong>
          <p>{t("proof.items.0.description")}</p>
        </article>
        <article className="proof-item">
          <span>{t("proof.items.1.num")}</span>
          <strong>{t("proof.items.1.title")}</strong>
          <p>{t("proof.items.1.description")}</p>
        </article>
        <article className="proof-item">
          <span>{t("proof.items.2.num")}</span>
          <strong>{t("proof.items.2.title")}</strong>
          <p>{t("proof.items.2.description")}</p>
        </article>
        <article className="proof-item">
          <span>{t("proof.items.3.num")}</span>
          <strong>{t("proof.items.3.title")}</strong>
          <p>{t("proof.items.3.description")}</p>
        </article>
      </section>

      <section className="landing-loop" id="loop">
        <div className="section-copy">
          <span className="eyebrow">{t("gameplay.eyebrow")}</span>
          <h2>{t("gameplay.title")}</h2>
          <p>{t("gameplay.description")}</p>
        </div>
        <div className="loop-feature-grid">
          <article className="landing-feature">
            <span>{t("gameplay.features.0.step")}</span>
            <h3>{t("gameplay.features.0.title")}</h3>
            <p>{t("gameplay.features.0.description")}</p>
          </article>
          <article className="landing-feature">
            <span>{t("gameplay.features.1.step")}</span>
            <h3>{t("gameplay.features.1.title")}</h3>
            <p>{t("gameplay.features.1.description")}</p>
          </article>
          <article className="landing-feature">
            <span>{t("gameplay.features.2.step")}</span>
            <h3>{t("gameplay.features.2.title")}</h3>
            <p>{t("gameplay.features.2.description")}</p>
          </article>
          <article className="landing-feature">
            <span>{t("gameplay.features.3.step")}</span>
            <h3>{t("gameplay.features.3.title")}</h3>
            <p>{t("gameplay.features.3.description")}</p>
          </article>
        </div>
      </section>

      <section className="landing-onchain" id="onchain">
        <div className="section-copy">
          <span className="eyebrow">{t("onchain.eyebrow")}</span>
          <h2>{t("onchain.title")}</h2>
          <p>{t("onchain.description")}</p>
        </div>
        <div className="onchain-grid">
          <article className="chain-object">
            <span>{t("onchain.objects.0.name")}</span>
            <code>{hasPublishedPackage() ? suiPackageId : t("onchain.objects.0.code")}</code>
          </article>
          <article className="chain-object">
            <span>{t("onchain.objects.1.name")}</span>
            <code>{t("onchain.objects.1.code")}</code>
          </article>
          <article className="chain-object">
            <span>{t("onchain.objects.2.name")}</span>
            <code>{t("onchain.objects.2.code")}</code>
          </article>
        </div>
      </section>

      <section className="arena-shell" id="arena">
        <div className="arena-header">
          <span className="eyebrow">{t("arena.header.eyebrow")}</span>
          <h2>{t("arena.header.title")}</h2>
          <p>{t("arena.header.description")}</p>
        </div>

        <section className="command-band">
          <div className="signal-copy">
            <span className="eyebrow">{t("arena.commandBand.eyebrow")}</span>
            <h2>{t("arena.commandBand.title")}</h2>
            <p>{t("arena.commandBand.description")}</p>
          </div>

          <form
            className="creator-console"
            onSubmit={(event) => {
              event.preventDefault();
              void handleCreateCivilization(event);
            }}
          >
            <label htmlFor="civilization-prompt">{t("arena.commandBand.formLabel")}</label>
            <div className="prompt-row">
              <input
                id="civilization-prompt"
                value={input}
                onChange={handleInputChange}
                placeholder={t("arena.commandBand.placeholder")}
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? t("arena.commandBand.loading") : t("arena.commandBand.submit")}
              </button>
            </div>
            <div className="chain-strip">
              <span>{t("arena.chainStrip.0")}</span>
              <span>{t("arena.chainStrip.1")}</span>
              <span>{t("arena.chainStrip.2")}</span>
            </div>
          </form>
        </section>

        <section className="chain-console">
          <div className="chain-console-copy">
            <span className="eyebrow">{t("arena.chainConsole.eyebrow")}</span>
            <h2>{t("arena.chainConsole.title")}</h2>
            <p>{chainStatus}</p>
          </div>
          <div className="chain-console-actions">
            {!wallet.isReady ? (
              <button type="button" onClick={wallet.activate} disabled={wallet.isLoading}>
                {wallet.isLoading ? "Loading Wallet..." : "Activate Wallet"}
              </button>
            ) : (
              <>
                {wallet.connection.account ? (
                  <span className="wallet-connected">
                    Connected: {wallet.connection.account.address.slice(0, 8)}...
                  </span>
                ) : (
                  <span className="wallet-not-connected">
                    {t("arena.chainConsole.notConnected")}
                  </span>
                )}
                <button type="button" onClick={mintSelectedOnSui}>
                  {t("arena.chainConsole.writeButton")}
                </button>
              </>
            )}
          </div>
          <div className="chain-console-meta">
            <span>
              {t("arena.chainConsole.network")} {wallet.network}
            </span>
            <span>
              {t("arena.chainConsole.wallet")}{" "}
              {wallet.connection.account
                ? wallet.connection.account.address.slice(0, 8) + "..."
                : wallet.isReady
                  ? t("arena.chainConsole.notConnected")
                  : "SDK not loaded"}
            </span>
            <span>
              {t("arena.chainConsole.package")}{" "}
              {hasPublishedPackage() ? suiPackageId : t("arena.chainConsole.packageMissing")}
            </span>
          </div>
        </section>

        <section className="world-grid">
          <aside className="panel leaderboard-panel">
            <div className="panel-heading">
              <span>{t("leaderboard.title")}</span>
              <strong>
                {leader?.symbol} {t("leaderboard.leads")}
              </strong>
            </div>
            <div className="civilization-list">
              {[...civilizations]
                .sort((a, b) => b.followers + b.influence - (a.followers + a.influence))
                .map((civilization, index) => (
                  <button
                    type="button"
                    className={`civilization-card ${civilization.id === selectedId ? "is-active" : ""}`}
                    key={civilization.id}
                    onClick={() => setSelectedId(civilization.id)}
                  >
                    <span className="rank">{String(index + 1).padStart(2, "0")}</span>
                    <span
                      className="sigil"
                      style={{
                        background: `linear-gradient(135deg, ${civilization.colors[0]}, ${civilization.colors[1]})`,
                      }}
                    >
                      {civilization.symbol.slice(1, 3)}
                    </span>
                    <span className="civ-copy">
                      <strong>{civilization.name}</strong>
                      <small>{civilization.slogan}</small>
                    </span>
                    <span className="power">{civilization.influence + civilization.followers}</span>
                  </button>
                ))}
            </div>
          </aside>

          <section className="map-panel">
            <div className="map-header">
              <div>
                <span className="eyebrow">{t("map.eyebrow")}</span>
                <h2>{world.memeTrend}</h2>
              </div>
              <div className={`mood-pill ${world.marketMood}`}>
                {t(`marketMood.${world.marketMood}`)}
              </div>
            </div>
            <div className="world-map" aria-label={t("map.ariaLabel")}>
              <div className="map-grid-lines" />
              {civilizations.map((civilization) => (
                <button
                  type="button"
                  className={`map-node ${civilization.id === selectedId ? "is-selected" : ""}`}
                  key={civilization.id}
                  style={{
                    left: `${civilization.coordinates.x}%`,
                    top: `${civilization.coordinates.y}%`,
                    ["--node-color" as string]: civilization.colors[0],
                  }}
                  onClick={() => setSelectedId(civilization.id)}
                >
                  <span>{civilization.symbol}</span>
                </button>
              ))}
            </div>
            <div className="world-metrics">
              <Meter label={t("map.chaos")} value={world.chaos} />
              <Meter label={t("map.allianceDensity")} value={world.allianceDensity} />
              <Meter label={t("map.warFrequency")} value={world.warFrequency} />
            </div>
          </section>

          <aside className="panel feed-panel">
            <div className="panel-heading">
              <span>{t("feed.title")}</span>
              <strong>
                {events.length} {t("feed.events")}
              </strong>
            </div>
            <div className="event-feed">
              {events.map((event) => (
                <article className="event-row" key={event.id}>
                  <div className="event-meta">
                    <span>{event.at}</span>
                    <span>{event.type}</span>
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.body}</p>
                  <code>{event.onchainRef}</code>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="detail-grid">
          <article className="panel detail-panel">
            <div className="detail-topline">
              <div
                className="large-sigil"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${selectedCivilization.colors[0]}, ${selectedCivilization.colors[1]})`,
                }}
              >
                {selectedCivilization.symbol.slice(1, 4)}
              </div>
              <div>
                <span className="eyebrow">{t("detail.eyebrow")}</span>
                <h2>{selectedCivilization.name}</h2>
                <p>{selectedCivilization.lore}</p>
              </div>
            </div>
            <div className="trait-row">
              {selectedCivilization.personality.map((trait) => (
                <span key={`${selectedCivilization.id}-${trait}`}>{t(`personality.${trait}`)}</span>
              ))}
              <span>
                {t("detail.mood")} {t(`mood.${selectedCivilization.mood}`)}
              </span>
              <span>
                {t("detail.level")} {selectedCivilization.level}
              </span>
            </div>
            <div className="stat-grid">
              <Stat label={t("detail.stats.followers")} value={selectedCivilization.followers} />
              <Stat label={t("detail.stats.influence")} value={selectedCivilization.influence} />
              <Stat label={t("detail.stats.treasury")} value={selectedCivilization.treasury} />
              <Stat label={t("detail.stats.aggression")} value={selectedCivilization.aggression} />
              <Stat label={t("detail.stats.stability")} value={selectedCivilization.stability} />
              <Stat label={t("detail.stats.reputation")} value={selectedCivilization.reputation} />
            </div>
            <div className="chain-card">
              <div>
                <span>{t("detail.suiObject")}</span>
                <code>{selectedCivilization.suiObjectId}</code>
              </div>
              <div>
                <span>{t("detail.walrusRef")}</span>
                <code>{selectedCivilization.walrusRef}</code>
              </div>
            </div>
          </article>

          <article className="panel community-panel">
            <div className="panel-heading">
              <span>{t("community.title")}</span>
              <strong>
                {communitySupport[selectedCivilization.id] ?? 0} {t("community.support")}
              </strong>
            </div>
            <div className="vote-stack">
              <button type="button" onClick={() => voteFor("ATTACK")}>
                {t("community.pushAttack")}
              </button>
              <button type="button" onClick={() => voteFor("PROPAGANDA")}>
                {t("community.boostPropaganda")}
              </button>
              <button type="button" onClick={() => voteFor("RITUAL")}>
                {t("community.demandRitual")}
              </button>
            </div>
            <button
              type="button"
              className="war-button"
              onClick={() => startWar(selectedCivilization)}
            >
              {t("community.startWar")}
            </button>
            <button type="button" className="alliance-button" onClick={handleFormAlliance}>
              Form Onchain Alliance
            </button>
          </article>

          <article className="panel war-panel">
            <div className="panel-heading">
              <span>{t("war.title")}</span>
              <strong>
                {activeWar?.result ? t("war.resolved") : activeWar ? t("war.live") : t("war.idle")}
              </strong>
            </div>
            {activeWar ? (
              <WarRoom war={activeWar} civilizations={civilizations} t={t} />
            ) : (
              <div className="empty-war">
                <h3>{t("war.emptyTitle")}</h3>
                <p>{t("war.emptyDescription")}</p>
              </div>
            )}
            {activeWar?.result && (
              <button type="button" className="record-war-button" onClick={handleRecordWar}>
                Record War on Chain
              </button>
            )}
          </article>
        </section>
      </section>
      <Toaster position="bottom-right" />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="meter">
      <div className="meter-topline">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="meter-track">
        <span style={{ width: `${clamp(value)}%` }} />
      </div>
    </div>
  );
}

function WarRoom({
  war,
  civilizations,
  t: warT,
}: {
  war: WarState;
  civilizations: Civilization[];
  t: ReturnType<typeof useI18n>["t"];
}) {
  const attacker = civilizations.find((civilization) => civilization.id === war.attackerId);
  const defender = civilizations.find((civilization) => civilization.id === war.defenderId);

  return (
    <div className="war-room">
      <div className="versus-row">
        <Combatant civilization={attacker} score={war.attackerScore} />
        <span className="versus">VS</span>
        <Combatant civilization={defender} score={war.defenderScore} />
      </div>
      <p>{war.declaration}</p>
      <div className="war-progress">
        <span style={{ width: `${war.progress}%` }} />
      </div>
      {war.result ? (
        <strong className="war-result">{war.result}</strong>
      ) : (
        <span className="war-tick">{warT("war.resolving")}</span>
      )}
    </div>
  );
}

function Combatant({ civilization, score }: { civilization?: Civilization; score: number }) {
  return (
    <div className="combatant">
      <strong>{civilization?.symbol ?? "$???"}</strong>
      <span>{civilization?.name ?? "Unknown Civ"}</span>
      <code>{score}</code>
    </div>
  );
}

export default App;
