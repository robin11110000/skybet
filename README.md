# Skybet

## 🏗️ Project Structure 

```
aleo-betting-app/
├── apps/
│   ├── contracts/          # Leo smart contracts
│   │   └── src/
│   │       └── main.leo    # Simple playground-ready contract
│   ├── backend/           # Express.js API
│   │   ├── index.js
│   │   └── package.json
│   └── frontend/          # React app (like web)
│       └── package.json
├── package.json            # Root monorepo config
└── leo/                   # Leo CLI installation
```

## 🚀 Leo Playground Testing (Ready Now!)

**Contract**: `apps/contracts/src/main.leo`
**Copy this to**: https://play.leo-lang.org/

### ✨ Simple Functions:

1. **create_market** - Creates flight betting market
2. **place_bet** - Places bet on flight outcome  
3. **resolve_flight** - Oracle resolves actual outcome

### 🎮 Testing Steps:

#### Step 1: Create Market
```leo
// Input parameters
[
    "UAL123_NYC",    // flight_data
    "aleo1..."       // creator address
]
```

#### Step 2: Place Bet
```leo  
// Input parameters (use output from step 1)
[
    "flight_bet_record_from_create",
    "1u8",          // outcome (delayed) 
    "100u64",        // bet amount
    "aleo1..."       // bettor address
]
```

#### Step 3: Resolve Flight
```leo
// Input parameters
[
    "flight_bet_record_from_place_bet",
    "2u8"           // actual outcome (cancelled)
]
```

## 🔧 Local Development

```bash
# Build contract
npm run contract:build

# Deploy to testnet  
npm run contract:deploy

# Start backend
npm run backend:dev

# Start frontend
npm run frontend:dev
```

## 📋 Key Features

- ✅ **Simple deployment** - Optimized for Playground
- ✅ **Monorepo structure** - Like original flightInsurance
- ✅ **Modular design** - Separate contracts/backend/frontend
- ✅ **Flight outcome betting** - ontime/delayed/cancelled
- ✅ **Oracle resolution** - Admin can set actual outcomes

