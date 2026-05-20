# Autonomous Meme Civilization - Pitch Deck

## Sui Overflow 2026 Hackathon Submission

---

## Slide 1: Title

**Autonomous Meme Civilization**

> An autonomous AI civilization simulator where memes evolve into living onchain species.

**Track**: Agentic Web / Degen

**Team**: [Team Name]

---

## Slide 2: The Problem

### Web3 lacks autonomous, living digital entities

- **Memes are static**: Doge, Pepe, Shib - just images, no agency
- **No evolution**: Meme culture dies without community push
- **No onchain identity**: Memes exist offchain, no Sui-native representation
- **No AI autonomy**: No autonomous behavior loops in Web3

**What if memes could think, act, and evolve onchain?**

---

## Slide 3: Our Solution

### Autonomous Meme Civilization

A **AI-native onchain civilization simulator** where:

- Memes become **autonomous civilizations**
- Each civ has **identity, personality, mood, aggression**
- Civilizations **act autonomously**: propaganda, recruitment, alliances, wars
- All state is **onchain**: Sui objects for civs, alliances, wars
- **Walrus** stores civilization metadata

---

## Slide 4: Product Demo

### Core Flow

1. **Create** - User inputs a meme prompt
2. **Generate** - AI generates civilization identity
3. **Simulate** - Autonomous behavior loop runs
4. **Interact** - Users vote, support, influence outcomes
5. **Onchain** - Write civilization to Sui Testnet

**Live Demo**: http://localhost:5175/

---

## Slide 5: Key Features

| Feature                      | Description                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| **AI Identity Generation**   | Name, symbol, slogan, lore, personality, colors             |
| **Autonomous Behavior Loop** | Civs create propaganda, recruit, form alliances, start wars |
| **Real-time World Map**      | Influence density, alliance heatmap, war frequency          |
| **Meme War Simulation**      | Followers + influence + treasury + randomness               |
| **Sui Onchain Objects**      | MemeCivilization, Alliance, MemeWar                         |
| **Walrus Metadata**          | Civilization data stored in Walrus blobs                    |

---

## Slide 6: Technical Architecture

### Stack

```
Frontend: React + TypeScript + Vite+
Wallet:   Sui dApp Kit React (lazy-loaded)
Chain:    Sui TypeScript SDK + PTB Builder
Storage:  Walrus (blob storage)
Contract: Sui Move (autonomous_meme_civilization)
```

### Sui Move Objects

```move
struct MemeCivilization has key, store {
    id: UID,
    creator: address,
    name: String,
    symbol: String,
    followers: u64,
    influence: u64,
    treasury_score: u64,
    aggression: u8,
    stability: u8,
    level: u64,
    lore_hash: vector<u8>,
    walrus_ref: vector<u8>,
    created_at: u64,
}
```

---

## Slide 7: Onchain Integration

### Already Deployed on Sui Testnet

```
PackageID: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
Publish digest: BxiJbSsCPPrbyWehutdn5pNiEVnhryELZYM2GoKhpsxb
```

### Transaction Types

| Function              | Purpose                          |
| --------------------- | -------------------------------- |
| `create_civilization` | Mint new MemeCivilization object |
| `record_event`        | Log civilization events          |
| `form_alliance`       | Create Alliance between two civs |
| `record_war`          | Record MemeWar outcome           |

---

## Slide 8: Walrus Integration

### Civilization Metadata in Walrus

```typescript
interface CivilizationWalrusData {
  name: string; // "Green Candle Cult"
  symbol: string; // "GCC"
  slogan: string; // "Light the path"
  lore: string; // 500+ word backstory
  personality: string[]; // ["chaotic", "poetic"]
  colors: [string, string]; // ["#00ff00", "#1a1a1a"]
}
```

**Workflow:**

1. Generate civ data → Upload to Walrus → Get blobId
2. Store blobId as `walrus_ref` on Sui
3. Read blob on demand for detailed info

---

## Slide 9: AI Autonomous Behavior

### Behavior Loop (runs every 3 seconds)

```typescript
const behaviorCycle = () => {
  civilizations.forEach((civ) => {
    const action = chooseAction(civ); // based on mood, aggression

    switch (action) {
      case "PROPAGANDA":
        spreadNarrative(civ);
      case "RECRUIT":
        gainFollowers(civ);
      case "ALLIANCE":
        seekAlliance(civ);
      case "ATTACK":
        startWar(civ);
      case "RITUAL":
        performRitual(civ);
      case "EVOLUTION":
        levelUp(civ);
      case "BETRAY":
        breakAlliance(civ);
    }

    updateWorldState();
  });
};
```

---

## Slide 10: User Interaction

### Community Influence

- **Vote** - Support your favorite civilization
- **Boost** - Increase civ's followers, treasury
- **Trigger War** - Initiate meme wars between civs
- **Write Onchain** - Commit civ to Sui Testnet

### Real-time Events Feed

- Propaganda events
- Alliance formations/breaks
- War outcomes
- Ritual performances
- Level evolution

---

## Slide 11: Market Opportunity

### Why This Matters

- **Meme Economy**: $60B+ in meme coins (DOGE, PEPE, SHIB)
- **AI Agents**: Growing trend in Web3 (AI trading, AI DAOs)
- **Autonomous Worlds**: EVE Frontier won $80K hackathon with similar concept
- **Sui Advantage**: Object model perfect for civilization objects

### Target Users

- Meme enthusiasts
- Web3 gamers
- AI-curious developers
- DeFi users (potential tokenization)

---

## Slide 12: Competition & Differentiation

| Project                          | Type             | Autonomous?          | Onchain?           |
| -------------------------------- | ---------------- | -------------------- | ------------------ |
| Doge/Shib                        | Static meme coin | ❌                   | ❌                 |
| AI DAOs                          | Governance only  | Partial              | ❌                 |
| EVE Frontier                     | Game modding     | ❌                   | Sui                |
| **Autonomous Meme Civilization** | AI simulation    | **✅ Full autonomy** | **✅ Sui objects** |

---

## Slide 13: Roadmap

### Completed ✓

- [x] MVP frontend with simulation loop
- [x] AI identity generation
- [x] Sui Move package published
- [x] Transaction builders (create, alliance, war)
- [x] Walrus integration
- [x] Wallet SDK lazy loading (bundle optimized)

### Next Steps

- [ ] Mainnet deployment
- [ ] Backend AI endpoint (replace local generation)
- [ ] State persistence service
- [ ] Token economics
- [ ] Mobile app

---

## Slide 14: Why Sui?

### Sui Advantages for This Project

1. **Object Model** - Perfect for civilization objects (MemeCivilization, Alliance, MemeWar)
2. **Composability** - Objects can be transferred, owned, referenced
3. **Fast Transactions** - PTB for batch operations
4. **Walrus Native** - Built-in blob storage integration
5. **Testnet Ready** - Already deployed and working

---

## Slide 15: Team & Ask

### Team

[Team member info - add yours]

### What We Need

- **Prize funding** for mainnet deployment
- **Ecosystem support** - audit, incubation
- **Community** - early adopters, testers
- **Partnerships** - meme communities, AI platforms

---

## Appendix

### Links

- **GitHub**: [repo link]
- **Testnet App**: http://localhost:5175/
- **Package ID**: 0x2ec7c48394ca315f70e5a4b17f4fa667ecf29dbeaba26330d26bc7be24c58f9b
- **Video Demo**: [YouTube link]

### Resources

- Sui Docs: https://docs.sui.io/
- Walrus Docs: https://docs.walrus.site/
- dApp Kit: https://sdk.mystenlabs.com/dapp-kit
