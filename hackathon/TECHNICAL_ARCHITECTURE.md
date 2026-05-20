# Autonomous Meme Civilization - Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │  App.tsx    │  │   Hooks     │  │    UI      │               │
│  │ (Main App)  │  │ (Wallet,    │  │ (World Map)│               │
│  │             │  │  Walrus)    │  │            │               │
│  └─────────────┘  └─────────────┘  └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
         │                │                │
         ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  chain.ts   │  │ useWalrus*  │  │ useWallet   │
│ (PTB Build) │  │ (Walrus SDK)│  │ (dApp Kit)  │
└─────────────┘  └─────────────┘  └─────────────┘
         │                │                │
         ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Sui Network                              │
│  ┌─────────────────────┐  ┌─────────────────────┐               │
│  │  Move Package       │  │  Walrus Network     │               │
│  │  (autonomous_meme_  │  │  (Blob Storage)     │               │
│  │   civilization)     │  │                     │               │
│  └─────────────────────┘  └─────────────────────┐               │
└─────────────────────────────────────────────────────────────────┘
```

## Module Structure

### Frontend Architecture

```
src/
├── App.tsx                  # Main app component
│   ├── Civilization creation form
│   ├── Behavior simulation loop
│   ├── World map rendering
│   ├── Event feed
│   ├── Leaderboard
│   └── Chain console (wallet integration)
│
├── wallet/                  # Lazy-loaded wallet SDK
│   ├── WalletContext.tsx    # Wallet state context
│   ├── LazyWalletProvider   # Dynamic import wrapper
│   └── WalletProviderContent # DAppKitProvider bridge
│
├── composables/             # Vue-style hooks
│   ├── useGenerateCiv.ts    # AI generation hook
│   ├── useWalrusUpload.ts   # Walrus upload hook
│   └── useWalrusRead.ts     # Walrus read hook
│
├── chain.ts                 # Sui PTB builders
│   ├── buildCreateCivilizationTransaction
│   ├── buildFormAllianceTransaction
│   ├── buildRecordWarTransaction
│   ├── buildRecordEventTransaction
│   └── extractCreatedObjectId
│
├── types/
│   └── walrus.ts            # Walrus data types
│
└── i18n/                    # Internationalization
    ├── en.ts
    └── zh.ts
```

### Move Contract Structure

```
move/
├── Move.toml               # Package manifest
├── sources/
│   └── autonomous_meme_civilization.move
│       ├── MemeCivilization struct
│       ├── CivilizationEvent struct
│       ├── Alliance struct
│       ├── MemeWar struct
│       ├── create_civilization function
│       ├── record_event function
│       ├── form_alliance function
│       └── record_war function
│
└── build/                  # Compiled bytecode
```

## Data Models

### MemeCivilization (Sui Object)

```move
public struct MemeCivilization has key, store {
    id: UID,                   // Unique object ID
    creator: address,          // Creator wallet address
    name: String,              // Civilization name
    symbol: String,            // Token-style symbol
    followers: u64,            // Follower count
    influence: u64,            // Influence score
    treasury_score: u64,       // Treasury value
    aggression: u8,            // 0-100 aggression level
    stability: u8,             // 0-100 stability level
    level: u64,                // Evolution level
    lore_hash: vector<u8>,     // Hash of lore content
    walrus_ref: vector<u8>,    // Walrus blob ID
    created_at: u64,           // Creation timestamp
}
```

### CivilizationWalrusData (Walrus Blob)

```typescript
interface CivilizationWalrusData {
  name: string;           // e.g., "Green Candle Cult"
  symbol: string;         // e.g., "GCC"
  slogan: string;         // e.g., "Light the path to memetic enlightenment"
  lore: string;           // 500+ word backstory
  personality: string[];  // ["chaotic", "greedy", "poetic"]
  colors: [string, string]; // Primary and secondary colors
}
```

### Local State (Frontend)

```typescript
interface Civilization {
  id: string;
  name: string;
  symbol: string;
  slogan: string;
  lore: string;
  personality: string[];
  colors: [string, string];
  followers: number;
  influence: number;
  treasuryScore: number;
  aggression: number;
  stability: number;
  level: number;
  mood: Mood;            // hungry | euphoric | paranoid | ritualistic | vengeful
  suiObjectId?: string;
  walrusRef: string;
  createdAt: number;
}
```

## Key Components

### 1. Behavior Simulation Loop

```typescript
// Runs every 3 seconds
const simulationInterval = setInterval(() => {
  setCivilizations(prev => {
    return prev.map(civ => {
      const action = selectAction(civ);
      const result = executeAction(civ, action);
      return { ...civ, ...result.updates };
    });
  });
  setEvents(prev => [...prev, ...newEvents]);
  updateWorldState();
}, 3000);
```

### 2. Sui Transaction Builder

```typescript
export function buildCreateCivilizationTransaction(input: CivilizationMintInput) {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${suiPackageId}::civilization::create_civilization`,
    arguments: [
      tx.pure.string(input.name),
      tx.pure.string(input.symbol),
      tx.pure.u8(input.aggression),
      tx.pure.u8(input.stability),
      tx.pure.vector('u8', textEncoder.encode(input.lore)),
      tx.pure.vector('u8', textEncoder.encode(input.walrusRef)),
      tx.object('0x6'), // Clock object
    ],
  });
  
  tx.transferObjects([tx.object(result)], tx.pure.address(input.recipient));
  
  return tx;
}
```

### 3. Walrus Upload Hook

```typescript
export function useWalrusUpload() {
  const upload = async (data: CivilizationWalrusData, signer: Signer) => {
    const { client, WalrusFile } = await getClient();
    
    const file = WalrusFile.from({
      contents: new TextEncoder().encode(JSON.stringify(data)),
      identifier: `${data.name.toLowerCase()}.json`,
    });
    
    const results = await client.walrus.writeFiles({
      files: [file],
      epochs: 3,
      deletable: true,
      signer,
    });
    
    return results[0].blobId;
  };
  
  return { upload, ... };
}
```

### 4. Wallet Lazy Loading

```typescript
// Wallet SDK is NOT loaded on initial page load
export function LazyWalletProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  
  const activate = async () => {
    const walletModule = await import("@mysten/dapp-kit-react");
    const { SuiGrpcClient } = await import("@mysten/sui/grpc");
    
    const dAppKit = walletModule.createDAppKit({
      networks: ["testnet", "mainnet"],
      defaultNetwork: "testnet",
      createClient: (network) => new SuiGrpcClient({ network }),
    });
    
    setIsReady(true);
    setLoadedState({ module: walletModule, dAppKit });
  };
  
  // Stub context until activated
  return (
    <WalletContext.Provider value={{ isReady, activate, ... }}>
      {children}
    </WalletContext.Provider>
  );
}
```

## Bundle Optimization

### Before Lazy Loading

```
index.js: 727.88 KB (gzip: 204 KB)
```

### After Lazy Loading

```
index.js:        510.66 KB (gzip: 149 KB)  ← Main bundle
grpc-*.js:       157.62 KB (gzip: 38 KB)   ← SuiGrpcClient (loaded on demand)
WalletProvider:  0.70 KB                   ← Wallet SDK chunk
walrus_wasm:     358.18 KB                 ← Walrus WASM (loaded on demand)
```

**Result: 30% reduction in initial bundle size**

## Testnet Deployment

### Package Information

```
Package ID: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
Network: Sui Testnet
Published: [Date]
Digest: BxiJbSsCPPrbyWehutdn5pNiEVnhryELZYM2GoKhpsxb
```

### Environment Variables

```bash
VITE_SUI_PACKAGE_ID=0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
```

## Security Considerations

### Transaction Safety

- Package ID gated: Only writes to known package
- Testnet only: No mainnet deployment yet
- User consent: Wallet connection required for transactions

### Walrus Safety

- Blob epochs: 3 epochs storage guarantee
- Deletable: User-controlled deletion
- JSON-only: Structured data format

## Testing

### Unit Tests

```bash
pnpm vp test --run
# Tests: 5 passed
# - buildRecordEventTransaction package gating
# - buildFormAllianceTransaction package gating
# - buildRecordWarTransaction package gating
```

### Integration Tests

- Manual: Connect wallet, create civilization, verify onchain
- Build: `pnpm vp build` → dist/ bundle

## Future Architecture

### Backend Service (Planned)

```
┌─────────────┐
│ AI Backend  │ ← Replace local generation
│ (LLM API)   │
└─────────────┘
      │
      ▼
┌─────────────┐
│ State Sync  │ ← Persist simulation state
│ (Database)  │
└─────────────┘
```

### Tokenization (Planned)

```move
// Future: Civilization token
struct CivToken has key, store {
    id: UID,
    civilization_id: ID,
    balance: Balance<SUI>,
}
```