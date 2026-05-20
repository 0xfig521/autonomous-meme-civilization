# Autonomous Meme Civilization

![Autonomous Meme Civilization logo](public/project-logo.png)

## English

Autonomous Meme Civilization is an AI-native onchain civilization simulator built for Sui Overflow 2026. It turns meme factions into autonomous civilizations that create identity, recruit followers, spread propaganda, form alliances, start wars, and update a shared realtime world state.

This is not a meme launchpad, token trading product, or AI chat app. The intended positioning is:

> An autonomous AI civilization simulator where memes evolve into living onchain species.

### Core Features

- Create a civilization from a simple meme prompt.
- Generate civilization name, symbol, slogan, lore, personality, mood, colors, and Walrus-style memory reference.
- Run autonomous AI-style behavior cycles in the browser.
- Show realtime events, leaderboard changes, world chaos, alliance density, and war frequency.
- Let community actions influence aggression, mood, and action priority.
- Simulate meme wars with followers, influence, treasury, community support, personality, and randomness.
- Connect a Sui wallet and prepare Testnet transaction writes.
- Compile a Sui Move package for the core object model.

### Product Flow

1. User enters a civilization prompt.
2. The app generates an autonomous meme civilization identity.
3. The civilization enters the live world map and leaderboard.
4. The behavior loop creates propaganda, recruitment, alliances, betrayals, expansions, rituals, and wars.
5. Users vote or support a civilization to influence its future behavior.
6. Important civilization objects and events can be written to Sui after package deployment.

### Tech Stack

- Vite+ / React / TypeScript
- Sui dApp Kit React
- Sui TypeScript SDK
- Sui Move
- Local realtime simulation loop
- Walrus references modeled as content-address metadata

### Run

```bash
vp install
vp dev
```

Development URL:

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

### Hackathon Materials

Prepared Sui Overflow 2026 submission materials are in `hackathon/`:

- `hackathon/SUBMISSION.md` - bilingual submission copy, track fit, evidence, roadmap.
- `hackathon/DEMO_SCRIPT.md` - 3-minute English/Chinese demo script and judge Q&A.
- `hackathon/PITCH.md` - 15s/30s/60s pitch, slide outline, taglines.
- `hackathon/TECHNICAL_OVERVIEW.md` - architecture, Sui object model, verification notes.
- `hackathon/CHECKLIST.md` - final submission checklist and copy-paste fields.

### Sui Testnet Writes

The Move package is published on Sui Testnet:

```text
PackageID: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
Publish digest: BxiJbSsCPPrbyWehutdn5pNiEVnhryELZYM2GoKhpsxb
```

The package id is already configured in `.env`:

```bash
VITE_SUI_PACKAGE_ID=0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
```

To write a civilization onchain:

1. Start the app:

```bash
vp dev
```

2. Connect a Sui wallet on Testnet.
3. Select a civilization.
4. Press `Write Selected Civ`.

To republish a new package version after Move changes:

```bash
vp run move:publish
```

### Project Structure

```text
src/
  App.tsx          Main React app, simulation loop, voting, war resolution
  App.css          Product UI system
  chain.ts         Sui PTB builder for create_civilization
  chain.test.ts    Safety test for package-id gated writes
  dapp-kit.ts      Sui dApp Kit provider configuration
move/
  Move.toml
  sources/autonomous_meme_civilization.move
public/
  Static public assets
```

### Current Status

Completed:

- Interactive MVP frontend
- Autonomous local simulation
- Community voting
- Meme war simulation
- Sui wallet control plane
- Sui transaction builder gated by `VITE_SUI_PACKAGE_ID`
- Sui Move object model published to Testnet
- Build, test, lint, and Move compile verification

Known follow-ups:

- Write `record_event`, `form_alliance`, and `record_war` transactions from the frontend.
- Replace local narrative generation with a backend AI endpoint.
- Replace mock Walrus references with real Walrus uploads.
- Persist realtime simulation state in a backend service.
- Lazy-load wallet SDK code to reduce production bundle size.

---

## 中文

Autonomous Meme Civilization 是一个为 Sui Overflow 2026 构建的 AI 原生链上文明模拟器。它把 Meme 阵营转化为自治文明：可以生成身份、招募追随者、传播叙事、结盟、发动战争，并持续更新一个共享的实时世界状态。

它不是 Meme 发射台，不是代币交易产品，也不是 AI 聊天应用。产品定位是：

> 一个让 Meme 进化为链上 AI 生命文明的自治世界模拟器。

### 核心功能

- 通过一个简单 Meme prompt 创建文明。
- 生成文明名称、符号、口号、背景故事、性格、情绪、颜色和 Walrus 风格的记忆引用。
- 在浏览器中运行自治 AI 风格的行为循环。
- 展示实时事件流、排行榜变化、世界混乱度、联盟密度和战争频率。
- 允许社区操作影响文明的攻击性、情绪和行动优先级。
- 基于追随者、影响力、金库分数、社区支持、性格和随机性模拟 Meme War。
- 支持连接 Sui 钱包，并准备向 Testnet 写入交易。
- 提供可编译的 Sui Move 包，用于核心对象模型。

### 产品流程

1. 用户输入文明 prompt。
2. 应用生成一个自治 Meme 文明身份。
3. 文明进入世界地图和排行榜。
4. 行为循环持续产生宣传、招募、结盟、背叛、扩张、仪式和战争事件。
5. 用户通过投票或支持影响文明后续行为。
6. 部署 Move 包后，关键文明对象和事件可以写入 Sui。

### 技术栈

- Vite+ / React / TypeScript
- Sui dApp Kit React
- Sui TypeScript SDK
- Sui Move
- 本地实时模拟循环
- Walrus 引用以内容地址元数据形式建模

### 运行

```bash
vp install
vp dev
```

开发地址：

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

### Sui Testnet 写入

Move 包已发布到 Sui Testnet：

```text
PackageID: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
Publish digest: BxiJbSsCPPrbyWehutdn5pNiEVnhryELZYM2GoKhpsxb
```

package id 已写入 `.env`：

```bash
VITE_SUI_PACKAGE_ID=0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
```

写入链上文明的流程：

1. 启动应用：

```bash
vp dev
```

2. 在 Testnet 连接 Sui 钱包。
3. 选择一个文明。
4. 点击 `Write Selected Civ`。

如果修改了 Move 合约，需要重新发布：

```bash
vp run move:publish
```

### 项目结构

```text
src/
  App.tsx          React 主应用、模拟循环、投票、战争结算
  App.css          产品 UI 样式系统
  chain.ts         create_civilization 的 Sui PTB 构造器
  chain.test.ts    package id 写入门禁的安全测试
  dapp-kit.ts      Sui dApp Kit provider 配置
move/
  Move.toml
  sources/autonomous_meme_civilization.move
public/
  静态公共资源
```

### 当前状态

已完成：

- 可交互 MVP 前端
- 本地自治模拟
- 社区投票
- Meme War 模拟
- Sui 钱包控制面板
- 由 `VITE_SUI_PACKAGE_ID` 控制的 Sui 交易构造器
- 已发布到 Testnet 的 Sui Move 对象模型
- 构建、测试、lint 和 Move 编译验证

后续事项：

- 从前端写入 `record_event`、`form_alliance` 和 `record_war` 交易。
- 将本地叙事生成替换为后端 AI 接口。
- 将 mock Walrus 引用替换为真实 Walrus 上传。
- 将实时模拟状态持久化到后端服务。
- 对钱包 SDK 进行懒加载，降低生产 bundle 体积。
