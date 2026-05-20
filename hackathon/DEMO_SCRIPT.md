# Demo Script / 演示脚本

## 3-minute English Demo

### 0:00 - 0:20 Opening

Autonomous Meme Civilization is an AI-native onchain civilization simulator for Sui. Instead of treating a meme as a static token or mascot, we turn every meme into a living civilization with identity, strategy, community influence, and persistent Sui object state.

### 0:20 - 0:50 Landing Page

The first screen explains the project quickly: meme factions are autonomous agents that can recruit, ally, spread propaganda, and fight for influence. The current world status shows the leading faction, world mood, and live event stream.

Track fit: Agentic Web first, with strong Degen, Walrus, and Entertainment & Culture alignment.

### 0:50 - 1:25 Create a Civilization

In the live arena, I enter a prompt:

```text
A frog cult that worships green candles
```

The app generates a civilization identity: name, token-style symbol, slogan, lore, personality traits, mood, colors, and starting stats. It appears in the leaderboard, map, and detail panel.

### 1:25 - 1:55 Autonomous World

The simulation loop runs without manual control. Civilizations generate propaganda, recruit followers, expand influence, form alliances, betray rivals, perform rituals, and attack. The realtime event feed makes the world feel alive.

### 1:55 - 2:25 Community Influence and War

Users can vote for actions such as attack, propaganda, or ritual. These votes influence support, aggression, and action priority. I trigger a Meme War. The war room calculates attacker and defender scores from followers, influence, treasury score, community support, personality, and randomness, then updates the world state.

### 2:25 - 2:50 Sui Integration

The app connects to a Sui wallet on Testnet. The Move package is already published. The `MemeCivilization` object stores creator, name, symbol, stats, lore hash, Walrus reference, and timestamp. The same package also defines `CivilizationEvent`, `Alliance`, and `MemeWar` objects.

### 2:50 - 3:00 Close

This is not a meme launchpad or AI chat app. It is a living civilization simulator where memes become autonomous onchain species.

## 3 分钟中文演示

### 0:00 - 0:20 开场

Autonomous Meme Civilization 是一个为 Sui 构建的 AI 原生链上文明模拟器。我们不是把 Meme 当成静态代币或头像，而是把每个 Meme 变成一个拥有身份、策略、社区影响和 Sui 持久对象状态的自治文明。

### 0:20 - 0:50 Landing Page

首屏会快速解释项目：Meme 阵营是自治 agent，可以招募、结盟、传播叙事、发动战争并争夺影响力。右侧展示当前领先文明、世界情绪和实时事件数量。

赛道上主投 Agentic Web，同时也适配 Degen、Walrus 和 Entertainment & Culture。

### 0:50 - 1:25 创建文明

进入实时 Arena 后，输入一个 prompt：

```text
A frog cult that worships green candles
```

应用会生成文明身份：名称、符号、口号、背景故事、性格、情绪、颜色和初始数值。这个文明会进入排行榜、地图和详情面板。

### 1:25 - 1:55 自治世界

模拟循环会自动运行。文明会自主产生宣传、招募追随者、扩张影响力、结盟、背叛、举行仪式和发动攻击。实时事件流让世界看起来一直在发生变化。

### 1:55 - 2:25 社区影响和战争

用户可以投票推动攻击、宣传或仪式。投票会影响支持度、攻击性和行动优先级。触发 Meme War 后，战争房间会根据追随者、影响力、金库分数、社区支持、性格和随机性计算双方分数，并更新世界状态。

### 2:25 - 2:50 Sui 集成

应用可以连接 Sui Testnet 钱包。Move 包已经发布。`MemeCivilization` 对象存储创建者、名称、符号、数值、lore hash、Walrus 引用和时间戳。同一个包还定义了 `CivilizationEvent`、`Alliance` 和 `MemeWar` 对象。

### 2:50 - 3:00 收尾

这不是 Meme 发射台，也不是 AI 聊天应用。它是一个让 Meme 进化为链上 AI 生命文明的自治世界模拟器。

## Judge Q&A / 评委问答

### Why Sui?

Sui's object model maps naturally to living civilizations. A civilization, an event, an alliance, and a war can each be an object with explicit ownership, references, and composability. This gives the simulation a persistent state layer instead of being only a frontend toy.

Sui 的对象模型非常适合表达“文明”这种实体。文明、事件、联盟和战争都可以成为有所有权、引用关系和组合能力的对象，让模拟系统不只是前端玩具，而是拥有可持久化的世界状态。

### Is this a token launchpad?

No. Token-style symbols are part of meme identity, but the MVP does not launch tradable tokens, create markets, or include real financial mechanics.

不是。符号只是 Meme 身份的一部分，MVP 不发行可交易代币，不创建市场，也不包含真实金融机制。

### What is autonomous about it?

Civilizations have personality, mood, stats, community signals, and world context. The action loop picks behaviors and produces consequences without the user manually choosing every action.

文明拥有性格、情绪、数值、社区信号和世界上下文。行为循环会自动选择行动并产生结果，不需要用户手动控制每一步。

### What would you build next?

The next milestone is to write every major event type onchain, store AI-generated memory in Walrus, and move the simulation loop to a backend service so multiple users share one persistent world.

下一步会把主要事件类型全部写链，将 AI 生成记忆存储到 Walrus，并把模拟循环迁移到后端服务，让多用户共享同一个持续世界。
