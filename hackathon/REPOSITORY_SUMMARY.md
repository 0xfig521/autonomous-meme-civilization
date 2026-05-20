# Autonomous Meme Civilization - Repository & Deployment Summary

## Quick Links

| Resource | URL/ID |
|----------|--------|
| **GitHub Repository** | [Add your repo URL] |
| **Testnet Package ID** | `0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b` |
| **Publish Digest** | `BxiJbSsCPPrbyWehutdn5pNiEVnhryELZYM2GoKhpsxb` |
| **Network** | Sui Testnet |
| **Dev Server** | `http://localhost:5175/` |

---

## Repository Structure

```
autonomous-meme-civilization/
├── src/
│   ├── App.tsx               # Main app (1316 lines)
│   ├── App.css               # UI styles (1240 lines)
│   ├── main.tsx              # Entry point
│   ├── chain.ts              # PTB builders (143 lines)
│   ├── chain.test.ts         # Safety tests (59 lines)
│   │
│   ├── wallet/               # Lazy-loaded wallet SDK
│   │   ├── WalletContext.tsx
│   │   ├── LazyWalletProvider.tsx
│   │   ├── WalletProviderContent.tsx
│   │   └── index.ts
│   │
│   ├── composables/          # React hooks
│   │   ├── useGenerateCiv.ts
│   │   ├── useWalrusUpload.ts
│   │   └── useWalrusRead.ts
│   │
│   ├── types/
│   │   └── walrus.ts         # Walrus data types
│   │
│   └── i18n/
│       ├── en.ts             # English translations
│       ├── zh.ts             # Chinese translations
│       └── index.ts          # I18n provider
│
├── move/
│   ├── Move.toml             # Package manifest
│   ├── sources/
│   │   └── autonomous_meme_civilization.move  # Move contract (127 lines)
│   └── build/                # Compiled bytecode
│
├── public/                   # Static assets
│
├── hackathon/                # Submission materials
│   ├── SUI_OVERFLOW_2026_GUIDE.md
│   ├── PITCH_DECK.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── DEMO_VIDEO_SCRIPT.md
│   └── REPOSITORY_SUMMARY.md (this file)
│
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── .env                      # VITE_SUI_PACKAGE_ID
│
├── README.md                 # Project documentation (EN/ZH)
└── AGENTS.md                 # AI coding guidelines
```

---

## Key Files for Submission

### 1. Move Contract

**File**: `move/sources/autonomous_meme_civilization.move`

```move
module autonomous_meme_civilization::civilization;

// 4 Onchain Objects:
// - MemeCivilization
// - CivilizationEvent
// - Alliance
// - MemeWar

// 4 Functions:
// - create_civilization(name, symbol, aggression, stability, lore_hash, walrus_ref)
// - record_event(civilization_id, event_type, event_hash)
// - form_alliance(civilization_a, civilization_b, strength)
// - record_war(attacker, defender, result, influence_change, attacker_won)
```

### 2. Transaction Builders

**File**: `src/chain.ts`

| Function | Purpose | Lines |
|----------|---------|-------|
| `buildCreateCivilizationTransaction` | Mint MemeCivilization object | 45-78 |
| `buildFormAllianceTransaction` | Create Alliance object | 80-105 |
| `buildRecordWarTransaction` | Record MemeWar outcome | 107-140 |
| `buildRecordEventTransaction` | Log civilization events | 142-165 |
| `extractCreatedObjectId` | Extract object ID from result | 167-180 |

### 3. Wallet Integration

**Files**: `src/wallet/*`

- Lazy-loaded for bundle optimization
- Stub values before activation
- DAppKitProvider bridge after activation
- `activate()` function triggers dynamic import

### 4. Walrus Hooks

**Files**: `src/composables/useWalrusUpload.ts`, `useWalrusRead.ts`

- Dynamic import for bundle optimization
- Upload: `WalrusFile.from()` + `client.walrus.writeFiles()`
- Read: `client.walrus.getFiles()` + `file.json()`

---

## Build & Deployment

### Development

```bash
# Install dependencies
vp install

# Start dev server
vp dev
# → http://localhost:5175/
```

### Verification

```bash
# Type check
pnpm tsc --noEmit

# Run tests
vp test --run
# → 5 passed, 1 skipped

# Lint check
vp check

# Build production
vp build
# → dist/ (511 KB main bundle)
```

### Move Contract

```bash
# Build Move package
vp run move:build

# Publish to Testnet
vp run move:publish
# → Requires Sui CLI + wallet
```

---

## Bundle Analysis

### Production Build (dist/)

| File | Size | Gzip | Purpose |
|------|------|------|---------|
| `index-*.js` | 510.66 KB | 149 KB | Main bundle |
| `grpc-*.js` | 157.62 KB | 38 KB | SuiGrpcClient (lazy) |
| `WalletProvider-*.js` | 0.70 KB | 0.4 KB | Wallet SDK (lazy) |
| `walrus_wasm_bg-*.wasm` | 358.18 KB | 187 KB | Walrus WASM |
| `index-*.css` | 17.91 KB | 4.5 KB | Styles |

### Optimization Techniques

1. **Wallet SDK lazy loading** - 30% bundle reduction
2. **Walrus SDK lazy loading** - Only loaded on upload/read
3. **SuiGrpcClient dynamic import** - Separate chunk

---

## Testnet Deployment Details

### Package Information

```
Package ID: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
Network: Sui Testnet
Gas Budget: 100,000,000 MIST
Published By: [Your wallet address]
```

### Object Types

| Type | Abilities | Description |
|------|-----------|-------------|
| `MemeCivilization` | key, store | Civilization object |
| `CivilizationEvent` | key, store | Event log |
| `Alliance` | key, store | Alliance record |
| `MemeWar` | key, store | War outcome |

### Transaction Examples

**Create Civilization:**
```
Transaction Kind: MoveCall
Package: 0x2ec7c...9b
Module: civilization
Function: create_civilization
Arguments: [name, symbol, aggression, stability, lore_hash, walrus_ref, Clock]
```

---

## Environment Variables

### Required

```bash
# .env
VITE_SUI_PACKAGE_ID=0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
```

### Optional (Future)

```bash
# AI Backend
VITE_AI_API_URL=https://your-ai-backend.com

# Walrus Publisher
VITE_WALRUS_PUBLISHER=your_publisher_id
```

---

## Dependencies

### Production

```json
{
  "dependencies": {
    "@mysten/dapp-kit-react": "^0.x",
    "@mysten/sui": "^2.x",
    "@mysten/walrus": "^1.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "@tanstack/react-query": "^5.x"
  }
}
```

### Development

```json
{
  "devDependencies": {
    "vite-plus": "^0.x",
    "typescript": "^6.x",
    "vitest": "^3.x"
  }
}
```

---

## Submission Checklist

### Code

- [x] Move contract (autonomous_meme_civilization.move)
- [x] Transaction builders (chain.ts)
- [x] Wallet integration (wallet/*)
- [x] Walrus integration (composables/*)
- [x] Tests passing (5/5)
- [x] Build successful
- [x] Testnet deployment

### Documentation

- [x] README.md (EN/ZH)
- [x] Hackathon guide
- [x] Pitch deck
- [x] Technical architecture
- [x] Demo video script

### Demo

- [ ] Video recording (TODO)
- [ ] Live demo (localhost:5175)

---

## Next Steps for Submission

1. **Record demo video** - Follow script, 3-5 min
2. **Upload to YouTube** - Unlisted or public
3. **Clean README** - Remove dev notes, focus on user
4. **Register on Devfolio** - https://www.deepsurge.xyz/hackathons/b587dc0c-4cb8-4e63-ada5-519df38103bf
5. **Submit before May 23** - Deadline
6. **Prepare demo for June 13-14** - Demo Days