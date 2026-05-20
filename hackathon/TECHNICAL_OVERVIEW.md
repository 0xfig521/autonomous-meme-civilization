# Technical Overview / 技术说明

## English

### Architecture

```text
User Prompt
  -> React/Vite+ frontend
  -> Civilization identity generator
  -> Local autonomous simulation loop
  -> Realtime event feed / world map / war room
  -> Sui wallet transaction builders
  -> Sui Testnet Move package
  -> Walrus-style content references for large AI memory
```

### Frontend

- `src/App.tsx`
  - Main product experience.
  - Landing page.
  - Civilization generation.
  - Autonomous action loop.
  - Realtime event feed.
  - Community voting.
  - Meme war resolution.
  - Sui wallet control plane.
- `src/App.css`
  - Visual system for landing page, arena, map, cards, metrics, and responsive states.
- `src/i18n/`
  - Chinese and English UI copy support.

### Sui Integration

- `src/dapp-kit.ts`
  - Sui dApp Kit provider configuration.
- `src/wallet/`
  - Lazy wallet provider boundary.
- `src/chain.ts`
  - Transaction builders:
    - `buildCreateCivilizationTransaction`
    - `buildRecordEventTransaction`
    - `buildFormAllianceTransaction`
    - `buildRecordWarTransaction`
  - Package ID guard through `VITE_SUI_PACKAGE_ID`.
  - Created object ID helper.

### Move Package

Move source:

```text
move/sources/autonomous_meme_civilization.move
```

Core objects:

```move
public struct MemeCivilization has key, store
public struct CivilizationEvent has key, store
public struct Alliance has key, store
public struct MemeWar has key, store
```

Constructor functions:

```move
create_civilization(...)
record_event(...)
form_alliance(...)
record_war(...)
```

Published Testnet package:

```text
0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
```

### AI and Walrus Integration Surface

- Local generation currently produces civilization names, symbols, lore, personality, mood, colors, and event narratives.
- `server/src/routes/generate.ts` provides a backend route surface for AI generation.
- `src/composables/useGenerateCiv.ts` and `src/composables/useGenerateNarrative.ts` provide frontend integration points.
- `src/composables/useWalrusUpload.ts` and `src/composables/useWalrusRead.ts` provide Walrus integration surfaces.
- MVP stores Walrus-style references and lore hashes in Sui objects.

### Verification

Run:

```bash
vp check
vp test
vp build
vp run move:build
```

Expected current result:

- Type/lint/format checks pass.
- Unit tests pass.
- Production build passes.
- Move package builds.
- Production build may warn about a large wallet/Sui SDK chunk; this is a known optimization target, not a correctness failure.

## 中文

### 架构

```text
用户 Prompt
  -> React/Vite+ 前端
  -> 文明身份生成器
  -> 本地自治模拟循环
  -> 实时事件流 / 世界地图 / 战争房间
  -> Sui 钱包交易构造器
  -> Sui Testnet Move 包
  -> 面向大型 AI 记忆的 Walrus 风格内容引用
```

### 前端

- `src/App.tsx`
  - 主产品体验。
  - Landing page。
  - 文明生成。
  - 自治行为循环。
  - 实时事件流。
  - 社区投票。
  - Meme War 结算。
  - Sui 钱包控制面板。
- `src/App.css`
  - Landing page、Arena、地图、卡片、指标和响应式状态的视觉系统。
- `src/i18n/`
  - 中英文 UI 文案支持。

### Sui 集成

- `src/dapp-kit.ts`
  - Sui dApp Kit provider 配置。
- `src/wallet/`
  - 钱包懒加载边界。
- `src/chain.ts`
  - 交易构造器：
    - `buildCreateCivilizationTransaction`
    - `buildRecordEventTransaction`
    - `buildFormAllianceTransaction`
    - `buildRecordWarTransaction`
  - 通过 `VITE_SUI_PACKAGE_ID` 做 package id 门禁。
  - 创建对象 ID 提取辅助函数。

### Move 包

Move 源码：

```text
move/sources/autonomous_meme_civilization.move
```

核心对象：

```move
public struct MemeCivilization has key, store
public struct CivilizationEvent has key, store
public struct Alliance has key, store
public struct MemeWar has key, store
```

构造函数：

```move
create_civilization(...)
record_event(...)
form_alliance(...)
record_war(...)
```

已发布 Testnet package：

```text
0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
```

### AI 与 Walrus 集成面

- 当前本地生成文明名称、符号、lore、性格、情绪、颜色和事件叙事。
- `server/src/routes/generate.ts` 提供后端 AI 生成接口面。
- `src/composables/useGenerateCiv.ts` 和 `src/composables/useGenerateNarrative.ts` 提供前端集成点。
- `src/composables/useWalrusUpload.ts` 和 `src/composables/useWalrusRead.ts` 提供 Walrus 集成面。
- MVP 将 Walrus 风格引用和 lore hash 存储到 Sui 对象中。

### 验证

运行：

```bash
vp check
vp test
vp build
vp run move:build
```

当前预期结果：

- 类型、lint、格式检查通过。
- 单元测试通过。
- 生产构建通过。
- Move 包编译通过。
- 生产构建可能提示钱包/Sui SDK chunk 较大，这是已知优化项，不是正确性问题。
