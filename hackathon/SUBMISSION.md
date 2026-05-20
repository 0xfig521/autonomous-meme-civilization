# Sui Overflow 2026 Submission Pack

## English

### Project Name

Autonomous Meme Civilization

### One-line Pitch

An AI-native onchain civilization simulator where meme factions become autonomous Sui objects that evolve, recruit, ally, spread propaganda, and fight for influence in realtime.

### Short Description

Autonomous Meme Civilization turns meme culture into a living onchain world. Users create a civilization from a short prompt; the app generates its identity, lore, personality, stats, and visual style; then the civilization enters a realtime arena where autonomous behavior cycles produce propaganda, recruitment, alliances, rituals, betrayals, expansion, and meme wars.

The project is built for Sui Overflow 2026 with a primary fit for the Agentic Web track and secondary fit for Walrus, Degen, and Entertainment & Culture. It is not a token launchpad or trading product. It uses Sui as the persistent object layer for civilization identity and provenance, while large AI-generated lore and memory can be referenced through Walrus-style content pointers.

### Problem

Most meme coins and meme communities are static: a ticker, a chart, a mascot, and a chat room. They do not have persistent identity, evolving memory, autonomous behavior, or composable state. Community energy exists, but it is not represented as a living system.

### Solution

Autonomous Meme Civilization models each meme as an autonomous civilization:

- The user creates a civilization from one prompt.
- AI-style generation creates name, symbol, lore, slogan, personality, mood, and colors.
- A simulation loop lets civilizations act on their own.
- Community votes influence strategy and world chaos.
- Wars resolve through followers, influence, treasury score, support, personality, and randomness.
- Sui Move objects persist civilization identity, event history, alliances, and war records.

### Sui Alignment

The project uses Sui where it is strongest: persistent, composable object state.

- `MemeCivilization`: identity, creator, stats, lore hash, Walrus reference, timestamp.
- `CivilizationEvent`: event provenance for propaganda, votes, war results, and world history.
- `Alliance`: relationship object between civilizations.
- `MemeWar`: conflict object with attacker, defender, result, influence delta, and timestamp.
- Sui dApp Kit and Sui TypeScript SDK power wallet connection and transaction construction.
- The Move package is published to Sui Testnet.

### Track Fit

- Primary: Agentic Web
  - Autonomous AI-style factions act, coordinate, conflict, and react to community signals using Sui object state.
- Secondary: Walrus
  - Large lore, generated history, memory, and media are modeled as off-chain content references suitable for Walrus.
- Secondary: Degen
  - The product is built around meme-native faction identity, viral social conflict, and degen culture without requiring real token trading.
- Secondary: Entertainment & Culture
  - The arena is a consumer-facing realtime simulation designed for streams, demos, short clips, and audience participation.

### What Is Working

- Interactive landing page and live arena.
- Civilization creation from a prompt.
- AI-style local identity and lore generation.
- Autonomous action loop.
- Realtime event feed.
- Leaderboard and world state metrics.
- Meme war simulation.
- Community voting and support.
- Sui wallet connection.
- Testnet transaction builder for `create_civilization`.
- Move package with civilization, event, alliance, and war object constructors.
- Intro video asset included in `public/autonomous-meme-civilization-intro.mp4`.
- Bilingual product documentation.

### Testnet Evidence

```text
Package ID: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
Publish digest: BxiJbSsCPPrbyWehutdn5pNiEVnhryELZYM2GoKhpsxb
Example MemeCivilization object: 0x3f0ecd0dbe1884f10fe879dcadf11bd04ed0bbd9e51996b5cefa6fac1a786e28
Example create transaction digest: 3P3dkU9NAWapnHmY28Aqpy49aiYthzDSKYHytTzQgPXb
```

### Tech Stack

- Vite+ / React / TypeScript
- Sui dApp Kit React
- Sui TypeScript SDK
- Sui Move
- Walrus SDK integration surface
- Local realtime simulation loop
- Hono backend scaffold for AI generation routes
- HyperFrames intro video for project presentation

### Run Locally

```bash
vp install
vp dev
```

Open:

```text
http://127.0.0.1:5174/
```

### Verify

```bash
vp check
vp test
vp build
vp run move:build
```

### Demo Video

Local project asset:

```text
public/autonomous-meme-civilization-intro.mp4
```

### Future Roadmap

- Write `record_event`, `form_alliance`, and `record_war` transactions from the live frontend.
- Replace local AI-style generation with hosted AI generation.
- Store large generated lore, memory, and media in Walrus.
- Persist world simulation state in a backend service.
- Add multiplayer voting rooms and stream overlays.
- Add AI diplomacy, inheritance, and long-term civilization memory.

---

## 中文

### 项目名称

Autonomous Meme Civilization

### 一句话介绍

一个 AI 原生链上文明模拟器，让 Meme 阵营变成可自治、可进化、可结盟、可传播叙事、可争夺影响力的 Sui 对象文明。

### 简短描述

Autonomous Meme Civilization 把 Meme 文化变成一个实时运行的链上自治世界。用户通过一句提示词创建文明，系统生成文明身份、背景故事、性格、数值和视觉风格；随后文明进入实时竞技场，自治行为循环会持续产生宣传、招募、结盟、仪式、背叛、扩张和 Meme War。

项目为 Sui Overflow 2026 构建，主赛道适配 Agentic Web，同时适配 Walrus、Degen、Entertainment & Culture 方向。它不是 Meme 发射台，也不是交易产品。项目使用 Sui 作为文明身份和事件溯源的持久对象层，并为大型 AI 生成内容预留 Walrus 内容引用。

### 解决的问题

大多数 Meme 币和 Meme 社区是静态的：一个 ticker、一张图、一个 mascot、一个聊天室。它们没有持续身份、演化记忆、自治行为和可组合状态。社区能量存在，但没有被表达成一个真正“活着”的系统。

### 解决方案

Autonomous Meme Civilization 将每个 Meme 建模为一个自治文明：

- 用户通过一句 prompt 创建文明。
- 系统生成名称、符号、背景故事、口号、性格、情绪和颜色。
- 模拟循环让文明自主行动。
- 社区投票影响文明策略和世界混乱度。
- 战争由追随者、影响力、金库分数、社区支持、性格和随机性共同决定。
- Sui Move 对象持久化文明身份、事件历史、联盟和战争记录。

### Sui 契合点

项目使用 Sui 最有优势的能力：持久、可组合的对象状态。

- `MemeCivilization`：身份、创建者、数值、lore hash、Walrus 引用、时间戳。
- `CivilizationEvent`：宣传、投票、战争结果、世界历史的事件溯源。
- `Alliance`：文明之间的关系对象。
- `MemeWar`：包含攻击方、防守方、结果、影响力变化和时间戳的冲突对象。
- Sui dApp Kit 和 Sui TypeScript SDK 用于钱包连接和交易构造。
- Move 包已发布到 Sui Testnet。

### 赛道匹配

- 主赛道：Agentic Web
  - AI 风格自治阵营可以行动、协调、冲突，并根据社区信号和 Sui 对象状态变化。
- 兼投：Walrus
  - 大型 lore、生成历史、AI 记忆和媒体内容可以通过 Walrus 内容引用承载。
- 兼投：Degen
  - 产品围绕 Meme 原生身份、病毒式社交冲突和 degen 文化构建，但不依赖真实交易。
- 兼投：Entertainment & Culture
  - 实时竞技场适合消费者体验、直播、演示短片和观众参与。

### 已完成功能

- 交互式 landing page 和实时 Arena。
- 从 prompt 创建文明。
- AI 风格本地身份和 lore 生成。
- 自治行为循环。
- 实时事件流。
- 排行榜和世界状态指标。
- Meme War 模拟。
- 社区投票与支持。
- Sui 钱包连接。
- `create_civilization` Testnet 交易构造器。
- 包含文明、事件、联盟、战争对象构造器的 Move 包。
- `public/autonomous-meme-civilization-intro.mp4` 项目介绍视频资产。
- 中英文项目文档。

### Testnet 证据

```text
Package ID: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
Publish digest: BxiJbSsCPPrbyWehutdn5pNiEVnhryELZYM2GoKhpsxb
Example MemeCivilization object: 0x3f0ecd0dbe1884f10fe879dcadf11bd04ed0bbd9e51996b5cefa6fac1a786e28
Example create transaction digest: 3P3dkU9NAWapnHmY28Aqpy49aiYthzDSKYHytTzQgPXb
```

### 技术栈

- Vite+ / React / TypeScript
- Sui dApp Kit React
- Sui TypeScript SDK
- Sui Move
- Walrus SDK 集成面
- 本地实时模拟循环
- Hono AI 生成接口脚手架
- HyperFrames 项目介绍视频

### 本地运行

```bash
vp install
vp dev
```

打开：

```text
http://127.0.0.1:5174/
```

### 验证

```bash
vp check
vp test
vp build
vp run move:build
```

### 演示视频

本地项目资产：

```text
public/autonomous-meme-civilization-intro.mp4
```

### 后续路线图

- 从前端写入 `record_event`、`form_alliance` 和 `record_war` 交易。
- 将本地 AI 风格生成替换为托管 AI 生成。
- 将大型 lore、记忆和媒体内容存储到 Walrus。
- 将世界模拟状态持久化到后端服务。
- 增加多人投票房间和直播 overlay。
- 增加 AI 外交、文明继承和长期记忆系统。
