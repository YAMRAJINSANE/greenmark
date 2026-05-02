# GreenMark Project Directory Structure

```
GREENMARK/
│
├── 📄 App.tsx                              # Root application component
├── 📄 package.json                         # Dependencies & scripts
├── 📄 app.json                             # Expo configuration
├── 📄 tsconfig.json                        # TypeScript configuration
├── 📄 .gitignore                           # Git ignore rules
│
├── 📚 README.md                            # Main documentation
├── 📚 DEVELOPMENT.md                       # Development guide
├── 📚 QUICKSTART.md                        # Quick start guide
├── 📚 PROJECT_STRUCTURE.md                 # This file
│
└── 📁 src/
    │
    ├── 🎨 theme/
    │   └── index.ts                        # Design system
    │       ├── Colors (primary, success, warning, semantic)
    │       ├── Typography (Sora, Inter, sizes)
    │       ├── Spacing (xs to huge)
    │       ├── Borders & radius
    │       └── Shadows
    │
    ├── 🧩 components/
    │   ├── Button.tsx                      # Reusable button (4 variants)
    │   ├── Input.tsx                       # Text input with validation
    │   ├── Card.tsx                        # Content card (3 variants)
    │   ├── Badge.tsx                       # Info badges (5 types)
    │   │   └── Chip.tsx                    # Selectable chips
    │   ├── Layout.tsx                      # Screen layouts & SafeArea
    │   └── index.ts                        # Component exports
    │
    ├── 📱 screens/
    │   │
    │   ├── 🔐 auth/
    │   │   ├── SplashScreen.tsx            # Onboarding welcome
    │   │   ├── LoginScreen.tsx             # Email/password login
    │   │   └── SignUpScreen.tsx            # User registration
    │   │
    │   ├── 🏢 onboarding/
    │   │   ├── BusinessTypeScreen.tsx      # Select business category
    │   │   └── BusinessDetailsScreen.tsx   # Business info form
    │   │
    │   ├── 📊 calculator/
    │   │   ├── CalculatorElectricityScreen.tsx     # Step 1: kWh
    │   │   ├── CalculatorLPGScreen.tsx             # Step 2: Gas
    │   │   ├── CalculatorWasteTransportScreen.tsx  # Step 3: Waste
    │   │   └── EmissionsResultScreen.tsx           # Results
    │   │
    │   ├── 🌿 offset/
    │   │   ├── MarketplaceScreen.tsx       # Browse projects
    │   │   ├── ProjectDetailScreen.tsx     # Project info
    │   │   ├── PurchaseCreditsScreen.tsx   # Purchase flow
    │   │   ├── PaymentScreen.tsx           # Dummy payment
    │   │   └── SuccessScreen.tsx           # Certificate
    │   │
    │   └── 📱 app/
    │       ├── DashboardScreen.tsx         # User dashboard
    │       ├── LearnScreen.tsx             # Educational content
    │       └── ProfileScreen.tsx           # Account & settings
    │
    ├── 🧭 navigation/
    │   └── RootNavigator.tsx               # Navigation structure
    │       ├── AuthStack
    │       ├── OnboardingStack
    │       ├── CalculatorStack
    │       ├── OffsetStack
    │       └── AppStack (Bottom Tabs)
    │
    ├── 💾 data/
    │   └── dummy.ts                        # Mock data
    │       ├── DUMMY_USER
    │       ├── BUSINESS_TYPES (5)
    │       ├── CITIES (10)
    │       ├── DUMMY_EMISSIONS
    │       ├── DUMMY_OFFSET_PROJECTS (5)
    │       ├── DUMMY_CERTIFICATES (2)
    │       ├── DUMMY_ARTICLES (4)
    │       ├── DUMMY_PAYMENT_METHODS (4)
    │       ├── DUMMY_TRANSACTIONS (3)
    │       └── DUMMY_DASHBOARD_STATS
    │
    ├── ⚙️ constants/
    │   └── index.ts                        # App constants
    │       ├── API endpoints
    │       ├── HTTP status codes
    │       ├── Error & success messages
    │       ├── Validation regex
    │       ├── Limits & pagination
    │       ├── Storage keys
    │       └── Feature flags
    │
    ├── 🛠️ utils/
    │   └── index.ts                        # Helper functions
    │       ├── validators (email, password, UPI, phone)
    │       ├── formatters (currency, date, CO2, trees)
    │       ├── calculations (emissions, credits, cost)
    │       ├── async utilities (delay, simulateApiCall)
    │       ├── storage utils (setItem, getItem, clear)
    │       ├── error handling
    │       ├── string utilities
    │       └── array utilities
    │
    └── 📘 types/
        └── index.ts                        # TypeScript definitions
            ├── User & Auth types
            ├── Emissions types
            ├── Project types
            ├── Offset & Payment types
            ├── Certificate types
            ├── Article types
            ├── API response types
            ├── Screen props types
            ├── Component props types
            └── Request/Response types
```

## 📊 File Statistics

```
Total Files Created: 40+

Breakdown:
├── Config Files:          5  (package.json, app.json, tsconfig.json, etc)
├── Documentation:         4  (README, DEVELOPMENT, QUICKSTART, this)
├── Screens:              17  (auth, onboarding, calculator, offset, app)
├── Components:            6  (Button, Input, Card, Badge, Layout, index)
├── Navigation:            1  (RootNavigator)
├── Data:                  1  (dummy.ts)
├── Utilities:             3  (constants, utils, types)
├── Root Files:            3  (App.tsx, .gitignore, etc)
└── Total:               40+
```

## 🎯 Screen Navigation Flow

```
App Launch
    ↓
├─→ Splash Screen (1)
    ↓
├─→ Login Screen (2) ←──────────────────────┐
    ↓                                        │
├─→ Sign Up Screen (3)                      │
    ↓                                        │
├─→ Business Type (4) ──────→ [Remember?] ──┤
    ↓                                        │
├─→ Business Details (5)                    │
    ↓                                   [Logged In?]
├─→ Dashboard (15) ◄─────────────────────────┘
    ↓
    ├─→ Calculator Flow:
    │   ├─ Electricity (6)
    │   ├─ LPG/Gas (7)
    │   ├─ Waste & Transport (8)
    │   └─ Results (9)
    │
    ├─→ Offset Flow:
    │   ├─ Marketplace (10)
    │   ├─ Project Detail (11)
    │   ├─ Purchase Credits (12)
    │   ├─ Payment (13)
    │   └─ Success (14)
    │
    ├─→ Learn (16)
    │
    └─→ Profile (17)
```

## 🎨 Component Hierarchy

```
App.tsx
  └── RootNavigator
      ├── AuthStack
      │   ├── SplashScreen
      │   ├── LoginScreen
      │   └── SignUpScreen
      │
      ├── OnboardingStack
      │   ├── BusinessTypeScreen
      │   └── BusinessDetailsScreen
      │
      └── AppStack (Bottom Tabs)
          ├── Dashboard
          │   └── Uses: Card, Button, ScreenContainer
          │
          ├── Calculator Stack
          │   └── Uses: Input, Button, Chip, Card
          │
          ├── Offset Stack
          │   └── Uses: Card, Button, Badge, Input
          │
          ├── Learn
          │   └── Uses: Card, Input, Chip
          │
          └── Profile
              └── Uses: Card, Button, Badge
```

## 💾 Data Flow

```
DUMMY_USER
    ↓
App Context (future Redux/Context)
    ↓
├─→ Dashboard (displays stats)
├─→ Calculator (uses emissions data)
├─→ Offset (displays projects)
├─→ Marketplace (filters projects)
└─→ Profile (shows user info)

DUMMY_OFFSET_PROJECTS
    ↓
├─→ Marketplace (list & filter)
├─→ Project Detail (detailed view)
└─→ Certificate (after purchase)

DUMMY_PAYMENT_METHODS
    ↓
    Payment Screen
    ↓
    Success → Certificate → Transaction
```

## 🚀 Build & Deploy

### Development
```bash
npm install
npm start           # Start Expo
# Press 'a' for Android, 'i' for iOS, 'w' for web
```

### Build APK (Android)
```bash
eas build --platform android
```

### Build IPA (iOS)
```bash
eas build --platform ios
```

### Deploy
```bash
eas submit --platform android  # Play Store
eas submit --platform ios      # App Store
```

## 📈 Lines of Code

```
Screens:        ~3000+ lines
Components:     ~800+ lines
Navigation:     ~300+ lines
Data/Utils:     ~1000+ lines
Theme/Config:   ~500+ lines
─────────────────────────────
Total:          ~5600+ lines
```

## ✨ Key Highlights

✅ **Production-Quality Code**
- TypeScript throughout
- Proper error handling
- Type-safe components
- Reusable architecture

✅ **Design System**
- Consistent styling
- Responsive layouts
- Professional appearance
- Fintech-inspired

✅ **Complete Feature Set**
- 17 full-featured screens
- Complete user journey
- Dummy payment system
- Mock data included

✅ **Developer Friendly**
- Clear folder structure
- Well-documented
- Easy to extend
- Best practices

---

**Ready to build the future of sustainability! 🌱**
