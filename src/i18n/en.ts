export const en = {
  nav: {
    world: "World",
    gameplay: "Gameplay",
    sui: "Sui",
    enterArena: "Enter Arena",
  },
  hero: {
    eyebrow: "Sui Testnet live / AI meme civilizations",
    title: "Autonomous Meme Civilization",
    description:
      "An AI-native onchain civilization simulator where meme factions think, recruit, form alliances, spread propaganda, and fight for influence in a realtime Sui world.",
    enterArena: "Enter live arena",
    readOnchain: "Read onchain model",
  },
  heroStatus: {
    leadingFaction: "Leading faction",
    worldMood: "World mood",
    eventStream: "Event stream",
    logs: "logs",
  },
  proof: {
    items: [
      {
        num: "01",
        title: "Autonomous agents",
        description:
          "Civilizations choose actions every cycle from their mood, stats, votes, and rivals.",
      },
      {
        num: "02",
        title: "Meme war engine",
        description:
          "Followers, influence, treasury, support, personality, and randomness settle conflicts.",
      },
      {
        num: "03",
        title: "Community pressure",
        description:
          "Votes tilt aggression, propaganda priority, ritual behavior, and global chaos.",
      },
      {
        num: "04",
        title: "Sui object state",
        description:
          "Identity and events are designed around composable civilization, alliance, and war objects.",
      },
    ],
  },
  gameplay: {
    eyebrow: "Gameplay loop",
    title: "Memes become political species",
    description:
      "A one-line prompt becomes a faction with lore, personality, stats, strategy, onchain identity, and a public event history that keeps moving without a human operator.",
    features: [
      {
        step: "Create",
        title: "Prompt a civilization",
        description:
          "AI generates name, symbol, slogan, ideology, lore, colors, and initial stats.",
      },
      {
        step: "Simulate",
        title: "Let agents act",
        description: "Factions recruit, expand, betray, ritualize, campaign, ally, and attack.",
      },
      {
        step: "Influence",
        title: "Push the timeline",
        description:
          "Audience support shifts priorities and turns passive spectators into world pressure.",
      },
      {
        step: "Evolve",
        title: "Update the world",
        description:
          "Wars, rankings, alliances, rivalries, and event logs change live as the arena runs.",
      },
    ],
  },
  onchain: {
    eyebrow: "Onchain substrate",
    title: "Built around Sui objects, not a token launchpad",
    description:
      "The MVP focuses on persistent civilization identity and event provenance. Sui stores small, composable world objects while large AI memories can move to Walrus references.",
    objects: [
      { name: "MemeCivilization", code: "package id pending" },
      { name: "CivilizationEvent", code: "event hash + civilization id + created_at" },
      { name: "Alliance / MemeWar", code: "object links, result, strength, influence delta" },
    ],
  },
  arena: {
    header: {
      eyebrow: "Live arena",
      title: "Command the current meme world",
      description:
        "Create a civilization, connect a Sui wallet, write selected factions to Testnet, and steer wars through community influence.",
    },
    commandBand: {
      eyebrow: "Sui Overflow 2026 / Agentic Web",
      title: "Autonomous Meme Civilization",
      description:
        "Every meme becomes a living onchain civilization: autonomous factions evolve, recruit, form alliances, spread propaganda, and fight for influence in realtime.",
      formLabel: "Create civilization",
      placeholder: "A frog cult that worships green candles",
      submit: "Mint AI Civ",
    },
    chainStrip: ["Sui object composer: ready", "Walrus memory: staged", "AI scheduler: live"],
    chainConsole: {
      eyebrow: "Sui Control Plane",
      title: "Wallet + Testnet writer",
      writeButton: "Write Selected Civ",
      network: "network:",
      wallet: "wallet:",
      notConnected: "not connected",
      package: "package:",
      packageMissing: "VITE_SUI_PACKAGE_ID missing",
      statusNotConnected: "Connect a Sui wallet before submitting transactions.",
      statusNoPackage: "Publish move/ and set VITE_SUI_PACKAGE_ID to enable real Testnet writes.",
      statusSubmitting: "Submitting {{symbol}} to {{network}}...",
      statusComplete: "Sui transaction complete: {{digest}}",
      statusReady: "Ready for Sui Testnet package configuration.",
      statusFailed: "Sui transaction failed.",
    },
  },
  leaderboard: {
    title: "Leaderboard",
    leads: "leads",
  },
  map: {
    eyebrow: "Living World Map",
    ariaLabel: "Meme civilization influence map",
    chaos: "Chaos",
    allianceDensity: "Alliance Density",
    warFrequency: "War Frequency",
  },
  feed: {
    title: "Realtime Feed",
    events: "events",
  },
  detail: {
    eyebrow: "Civilization Detail",
    mood: "mood:",
    level: "level",
    stats: {
      followers: "Followers",
      influence: "Influence",
      treasury: "Treasury",
      aggression: "Aggression",
      stability: "Stability",
      reputation: "Reputation",
    },
    suiObject: "Sui MemeCivilization",
    walrusRef: "Walrus lore memory",
  },
  community: {
    title: "Community Influence",
    support: "support",
    pushAttack: "Push Attack",
    boostPropaganda: "Boost Propaganda",
    demandRitual: "Demand Ritual",
    startWar: "Start Meme War",
  },
  war: {
    title: "Meme War Room",
    resolved: "resolved",
    live: "live",
    idle: "idle",
    emptyTitle: "No active war",
    emptyDescription:
      "Select a civilization and trigger a conflict. Followers, influence, treasury, aggression, support, and randomness decide the result.",
    resolving: "battle resolving onchain...",
  },
  actions: {
    PROPAGANDA: "Propaganda",
    RECRUIT: "Recruit",
    ALLIANCE: "Alliance",
    ATTACK: "Attack",
    RITUAL: "Ritual",
    EVOLUTION: "Evolution",
    EXPAND: "Expand",
    BETRAY: "Betray",
  },
  event: {
    createTitle: "{{name}} minted as a Sui object",
    createBody:
      "{{symbol}} receives lore, ideology, colors, AI memory, and a Walrus content reference.",
    submitTitle: "{{name}} submitted to Sui {{network}}",
    submitBody: "Wallet {{address}}... signed a create_civilization transaction.",
    voteTitle: "Community pushes {{name}} toward {{action}}",
    voteBody: "The next AI cycle will weight {{action}} more heavily for {{symbol}}.",
    attackTitle: "{{name}} starts a meme war",
    attackBody:
      "{{symbol}} attacks {{target}}. Community support is now part of the battle calculation.",
    warResultTitle: "Meme war stored on Sui Testnet",
    warResultBody: "{{winner}} defeats {{loser}} and captures influence.",
    warResolved: "War resolved.",
  },
  describeAction: {
    PROPAGANDA: '{{name}} broadcasts a new meme doctrine: "{{slogan}}"',
    RECRUIT: "{{name}} converts lurkers into followers with a synchronized raid chant.",
    ALLIANCE: "{{name}} searches for allies.",
    ALLIANCE_TARGET: "{{name}} offers {{target}} a temporary pact against irrelevance.",
    ATTACK: "{{name}} sharpens its propaganda weapons.",
    ATTACK_TARGET: "{{name}} declares a meme war on {{target}}.",
    RITUAL: "{{name}} performs a loyalty ritual to stabilize the timeline.",
    EVOLUTION: "{{name}} mutates its ideology after absorbing community sentiment.",
    EXPAND: "{{name}} expands territory across the influence map.",
    BETRAY: "{{name}} debates betrayal.",
    BETRAY_TARGET: "{{name}} breaks a pact with {{target}} and calls it strategic poetry.",
  },
  warDeclaration: [
    "Your memes are brittle.",
    "The timeline demands conquest.",
    "Our followers request glorious nonsense.",
  ],
  mood: {
    hungry: "hungry",
    euphoric: "euphoric",
    paranoid: "paranoid",
    ritualistic: "ritualistic",
    vengeful: "vengeful",
  },
  personality: {
    chaotic: "chaotic",
    greedy: "greedy",
    poetic: "poetic",
    aggressive: "aggressive",
    diplomatic: "diplomatic",
    paranoid: "paranoid",
  },
  marketMood: {
    bullish: "bullish",
    bearish: "bearish",
    feral: "feral",
  },
};
