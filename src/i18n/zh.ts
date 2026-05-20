import { en } from "./en";

export type TranslationMap = typeof en;

export const zh: TranslationMap = {
  nav: {
    world: "世界",
    gameplay: "玩法",
    sui: "链上",
    enterArena: "进入竞技场",
  },
  hero: {
    eyebrow: "Sui Testnet 在线 / AI 迷因文明",
    title: "自治迷因文明",
    description:
      "一个 AI 原生的链上文明模拟器，迷因阵营在这里思考、招募、结盟、传播叙事，并在实时 Sui 世界中争夺影响力。",
    enterArena: "进入实时竞技场",
    readOnchain: "查看链上模型",
  },
  heroStatus: {
    leadingFaction: "领先阵营",
    worldMood: "世界情绪",
    eventStream: "事件流",
    logs: "条记录",
  },
  proof: {
    items: [
      {
        num: "01",
        title: "自治代理",
        description: "文明每轮根据情绪、属性、投票和敌对关系自主选择行动。",
      },
      {
        num: "02",
        title: "迷因战争引擎",
        description: "追随者、影响力、金库、支持度、性格和随机性共同决定冲突结果。",
      },
      {
        num: "03",
        title: "社区压力",
        description: "投票影响攻击性、宣传优先级、仪式行为和全局混乱度。",
      },
      {
        num: "04",
        title: "Sui 对象状态",
        description: "身份和事件围绕可组合的文明、联盟和战争对象设计。",
      },
    ],
  },
  gameplay: {
    eyebrow: "玩法循环",
    title: "迷因成为政治物种",
    description:
      "一行提示词即可生成一个拥有背景故事、性格、属性、策略、链上身份和公开事件历史的阵营，无需人工操作即可持续演进。",
    features: [
      {
        step: "创造",
        title: "输入提示创建文明",
        description: "AI 生成名称、符号、口号、意识形态、背景故事、颜色和初始属性。",
      },
      {
        step: "模拟",
        title: "让代理自主行动",
        description: "阵营招募、扩张、背叛、仪式、宣传、结盟和攻击。",
      },
      {
        step: "影响",
        title: "推动时间线",
        description: "社区支持改变行动优先级，将被动观众转化为世界压力。",
      },
      {
        step: "进化",
        title: "更新世界",
        description: "战争、排名、联盟、敌对关系和事件日志随竞技场运行实时变化。",
      },
    ],
  },
  onchain: {
    eyebrow: "链上基座",
    title: "围绕 Sui 对象构建，而非代币发射台",
    description:
      "MVP 聚焦于持久的文明身份和事件溯源。Sui 存储小型的可组合世界对象，而大型 AI 记忆可迁移至 Walrus 引用。",
    objects: [
      { name: "MemeCivilization", code: "package id 待配置" },
      { name: "CivilizationEvent", code: "事件哈希 + 文明 id + 创建时间" },
      { name: "Alliance / MemeWar", code: "对象链接、结果、战力、影响力变化" },
    ],
  },
  arena: {
    header: {
      eyebrow: "实时竞技场",
      title: "指挥当前的迷因世界",
      description:
        "创建文明、连接 Sui 钱包、将选中阵营写入 Testnet，并通过社区影响力引导战争走向。",
    },
    commandBand: {
      eyebrow: "Sui Overflow 2026 / Agentic Web",
      title: "自治迷因文明",
      description:
        "每个迷因都成为鲜活的链上文明：自治阵营进化、招募、结盟、传播叙事，实时争夺影响力。",
      formLabel: "创建文明",
      placeholder: "一个崇拜绿色蜡烛的青蛙教派",
      submit: "铸造 AI 文明",
    },
    chainStrip: ["Sui 对象构造器：就绪", "Walrus 记忆：已暂存", "AI 调度器：运行中"],
    chainConsole: {
      eyebrow: "Sui 控制面板",
      title: "钱包 + Testnet 写入器",
      writeButton: "写入选中文明",
      network: "网络：",
      wallet: "钱包：",
      notConnected: "未连接",
      package: "包：",
      packageMissing: "VITE_SUI_PACKAGE_ID 缺失",
      statusNotConnected: "请先连接 Sui 钱包再提交交易。",
      statusNoPackage: "请发布 move/ 并设置 VITE_SUI_PACKAGE_ID 以启用真实的 Testnet 写入。",
      statusSubmitting: "正在将 {{symbol}} 提交至 {{network}}...",
      statusComplete: "Sui 交易完成：{{digest}}",
      statusReady: "Sui Testnet 包配置已就绪。",
      statusFailed: "Sui 交易失败。",
    },
  },
  leaderboard: {
    title: "排行榜",
    leads: "领先",
  },
  map: {
    eyebrow: "实时世界地图",
    ariaLabel: "迷因文明影响力地图",
    chaos: "混乱度",
    allianceDensity: "联盟密度",
    warFrequency: "战争频率",
  },
  feed: {
    title: "实时事件流",
    events: "条事件",
  },
  detail: {
    eyebrow: "文明详情",
    mood: "情绪：",
    level: "等级",
    stats: {
      followers: "追随者",
      influence: "影响力",
      treasury: "金库",
      aggression: "攻击性",
      stability: "稳定性",
      reputation: "声望",
    },
    suiObject: "Sui MemeCivilization",
    walrusRef: "Walrus 背景记忆",
  },
  community: {
    title: "社区影响力",
    support: "支持度",
    pushAttack: "推动攻击",
    boostPropaganda: "加强宣传",
    demandRitual: "要求仪式",
    startWar: "发起迷因战争",
  },
  war: {
    title: "迷因战争室",
    resolved: "已结束",
    live: "进行中",
    idle: "空闲",
    emptyTitle: "暂无进行中的战争",
    emptyDescription:
      "选择一个文明并触发冲突。追随者、影响力、金库、攻击性、支持度和随机性共同决定结果。",
    resolving: "链上战斗结算中...",
  },
  actions: {
    PROPAGANDA: "宣传",
    RECRUIT: "招募",
    ALLIANCE: "结盟",
    ATTACK: "攻击",
    RITUAL: "仪式",
    EVOLUTION: "进化",
    EXPAND: "扩张",
    BETRAY: "背叛",
  },
  event: {
    createTitle: "{{name}} 已作为 Sui 对象铸造",
    createBody: "{{symbol}} 获得背景故事、意识形态、颜色、AI 记忆和 Walrus 内容引用。",
    submitTitle: "{{name}} 已提交至 Sui {{network}}",
    submitBody: "钱包 {{address}}... 签署了 create_civilization 交易。",
    voteTitle: "社区推动 {{name}} 走向 {{action}}",
    voteBody: "下一个 AI 循环将更偏向 {{action}} 行为（{{symbol}}）。",
    attackTitle: "{{name}} 发起了一场迷因战争",
    attackBody: "{{symbol}} 攻击 {{target}}。社区支持现已加入战斗计算。",
    warResultTitle: "迷因战争已记录至 Sui Testnet",
    warResultBody: "{{winner}} 击败了 {{loser}} 并夺取了影响力。",
    warResolved: "战争已结算。",
  },
  describeAction: {
    PROPAGANDA: '{{name}} 传播了新的迷因信条："{{slogan}}"',
    RECRUIT: "{{name}} 通过同步突袭口号将潜伏者转化为追随者。",
    ALLIANCE: "{{name}} 正在寻找盟友。",
    ALLIANCE_TARGET: "{{name}} 向 {{target}} 提议缔结临时盟约，共抗无关紧要的命运。",
    ATTACK: "{{name}} 磨砺其宣传武器。",
    ATTACK_TARGET: "{{name}} 向 {{target}} 宣战。",
    RITUAL: "{{name}} 执行了忠诚仪式以稳定时间线。",
    EVOLUTION: "{{name}} 吸收了社区情绪后发生了意识形态突变。",
    EXPAND: "{{name}} 在影响力地图上扩张了领土。",
    BETRAY: "{{name}} 在讨论背叛。",
    BETRAY_TARGET: "{{name}} 撕毁了与 {{target}} 的盟约，并称之为战略诗篇。",
  },
  warDeclaration: ["你们的迷因不堪一击。", "时间线需要被征服。", "我们的追随者渴望荣耀的混乱。"],
  mood: {
    hungry: "饥渴",
    euphoric: "狂喜",
    paranoid: "偏执",
    ritualistic: "仪式化",
    vengeful: "复仇",
  },
  personality: {
    chaotic: "混乱",
    greedy: "贪婪",
    poetic: "诗意",
    aggressive: "攻击性",
    diplomatic: "外交",
    paranoid: "偏执",
  },
  marketMood: {
    bullish: "看涨",
    bearish: "看跌",
    feral: "狂野",
  },
};
