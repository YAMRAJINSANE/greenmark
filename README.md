# GreenMark - Carbon Offsetting Platform

A **production-ready mobile app** built with React Native + Expo for small businesses to measure, offset, and showcase their carbon emissions.

## 🚀 Features

✅ **17+ Screens** - Complete user journey from signup to carbon offsetting
✅ **Design System** - Fintech-style UI with custom theme
✅ **Dummy Data & Payments** - Pre-configured mock data and dummy payment structure
✅ **Bottom Tab Navigation** - Home | Calculate | Offset | Learn | Profile
✅ **TypeScript** - Type-safe codebase
✅ **Production-Ready** - Clean architecture, reusable components

## 📱 Screens Included

### Authentication (3 screens)
1. **Splash** - Onboarding welcome screen
2. **Login** - Email/password login with Google option
3. **Sign Up** - User registration form

### Onboarding (2 screens)
4. **Business Type Selection** - Select business category (Café, Restaurant, etc.)
5. **Business Details** - Enter business information

### Calculator (4 screens)
6. **Electricity Input** - Monthly kWh usage
7. **LPG/Gas Input** - Cylinder usage with PNG toggle
8. **Waste & Transport** - Waste categories and delivery app selection
9. **Emissions Result** - Total CO₂ calculation with breakdown

### Offsetting (5 screens)
10. **Marketplace** - Browse verified offset projects
11. **Project Detail** - Full project information
12. **Purchase Credits** - Select and calculate purchase
13. **Payment** - Dummy payment with UPI/GPay/PhonePe
14. **Success/Certificate** - Certificate generation and sharing

### App (3 screens)
15. **Dashboard** - User stats and quick actions
16. **Learn** - Educational articles
17. **Profile** - Account settings and info

## 🎨 Design System

### Colors
- **Primary (Teal):** `#2BA3A3`
- **Success (Green):** `#12B886`
- **Warning (Marigold):** `#F5A623`
- **Neutral Grays:** Multiple shades for hierarchy

### Typography
- **Headings:** Sora (22pt, 18pt, 14pt)
- **Body:** Inter (12pt, 11pt, 9pt)

### UI Components
- Buttons (56px height, thumb-friendly)
- Input fields with labels and helpers
- Cards (white, elevated, outlined)
- Badges & Chips
- Bottom Tab Navigation

## 📁 Project Structure

```
GREENMARK/
├── src/
│   ├── theme/
│   │   └── index.ts           # Design system
│   ├── components/
│   │   ├── Button.tsx         # CTA button
│   │   ├── Input.tsx          # Text input
│   │   ├── Card.tsx           # Content card
│   │   ├── Badge.tsx          # Badges & Chips
│   │   ├── Layout.tsx         # Screen layout
│   │   └── index.ts           # Exports
│   ├── data/
│   │   └── dummy.ts           # Mock data
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignUpScreen.tsx
│   │   ├── onboarding/
│   │   │   ├── BusinessTypeScreen.tsx
│   │   │   └── BusinessDetailsScreen.tsx
│   │   ├── calculator/
│   │   │   ├── CalculatorElectricityScreen.tsx
│   │   │   ├── CalculatorLPGScreen.tsx
│   │   │   ├── CalculatorWasteTransportScreen.tsx
│   │   │   └── EmissionsResultScreen.tsx
│   │   ├── offset/
│   │   │   ├── MarketplaceScreen.tsx
│   │   │   ├── ProjectDetailScreen.tsx
│   │   │   ├── PurchaseCreditsScreen.tsx
│   │   │   ├── PaymentScreen.tsx
│   │   │   └── SuccessScreen.tsx
│   │   └── app/
│   │       ├── DashboardScreen.tsx
│   │       ├── LearnScreen.tsx
│   │       └── ProfileScreen.tsx
│   └── navigation/
│       └── RootNavigator.tsx  # Navigation setup
├── App.tsx                    # Root component
├── app.json                   # Expo configuration
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Setup Steps

1. **Clone/Navigate to project**
```bash
cd GREENMARK
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on device/emulator**
- **iOS:** Press `i` in terminal
- **Android:** Press `a` in terminal
- **Web:** Press `w` in terminal

## 💳 Dummy Data

### Users
```javascript
{
  id: 'user_123',
  name: 'Rajesh Kumar',
  email: 'rajesh@greenmark.io',
  businessName: 'Happy Café'
}
```

### Payment Methods
- **UPI** (Default)
- **Google Pay**
- **PhonePe**
- **Paytm**

### Dummy Payment Flow
When user clicks "Pay":
1. Validates UPI ID or payment method
2. Simulates 2-second API call
3. Generates mock transaction ID
4. Shows success with certificate

### Sample Transactions
```javascript
{
  id: 'txn_001',
  amount: 2500,
  projectName: 'Amazon Forest Restoration',
  date: '2026-04-15',
  status: 'completed'
}
```

## 🌍 Offset Projects (Dummy)

5 pre-configured projects:
1. **Amazon Forest Restoration** - Brazil
2. **Solar Energy Initiative** - Gujarat, India
3. **Biogas Production** - West Bengal, India
4. **Wind Farm Development** - Tamil Nadu, India
5. **Mangrove Forest Protection** - Sundarbans, India

Each has:
- CO₂ offset capacity
- Pricing
- Impact stats
- Verra verification badge

## 📊 Calculations (Dummy)

### Emissions Formula
```
Total CO₂ = Electricity + Gas + Waste + Transport
- Electricity: kWh × 0.008 = tons CO₂
- LPG: cylinders × 0.084 = tons CO₂
- Waste: category-based (0.3-1.5 tons)
- Transport: delivery apps = 0.5-1.0 tons
```

### Result Example
For a café with:
- 400 kWh electricity → 3.2t
- 25 cylinders LPG → 2.1t
- 5-15kg waste → 1.5t
- Delivery apps → 1.6t
- **Total: 8.4t CO₂/year**

## 🎯 Production Checklist

- [ ] Replace dummy data with real APIs
- [ ] Integrate actual payment gateway (Razorpay/PhonePe)
- [ ] Add real carbon calculation algorithms
- [ ] Connect to actual offset project database
- [ ] Implement user authentication (Firebase/Auth0)
- [ ] Add certificate generation (PDF)
- [ ] Set up analytics
- [ ] Add error handling & logging
- [ ] Implement offline mode
- [ ] Setup CI/CD pipeline
- [ ] Prepare for App Store/Play Store submission

## 🔐 Security Notes

**Current Setup (Development):**
- Dummy payment structure
- No real transactions
- Mock user authentication

**For Production:**
- Implement OAuth/JWT
- Secure API endpoints
- SSL/TLS encryption
- PCI-DSS compliance for payments
- Secure credential storage

## 🚀 Build & Deployment

### Build APK (Android)
```bash
eas build --platform android --dev-client
```

### Build IPA (iOS)
```bash
eas build --platform ios
```

### Deploy to EAS
```bash
eas submit --platform android
```

## 📚 Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** React Navigation
- **State:** React Hooks
- **Styling:** React Native StyleSheet
- **Icons:** Emoji (production: use expo-icons)

## 🎨 Customization

### Change Primary Color
Edit `src/theme/index.ts`:
```typescript
primary: '#YOUR_COLOR'
```

### Add New Screens
1. Create component in appropriate folder
2. Add to navigation stack
3. Define screen props interface

### Modify Dummy Data
Edit `src/data/dummy.ts` and import where needed

## 📱 Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Thumb-friendly touch targets (56px+)
- Adaptive layouts

## 🐛 Troubleshooting

### Issue: npm install fails
**Solution:** Clear cache and retry
```bash
npm cache clean --force
npm install
```

### Issue: Expo app won't load
**Solution:** Rebuild bundles
```bash
npm start -- --reset-cache
```

### Issue: TypeScript errors
**Solution:** Generate types
```bash
tsc --noEmit
```

## 📞 Support & Resources

- **Expo Docs:** https://docs.expo.dev
- **React Native:** https://reactnative.dev
- **React Navigation:** https://reactnavigation.org
- **TypeScript:** https://www.typescriptlang.org

## 📄 License

MIT License - Free to use for commercial projects

## 👨‍💻 Developer Notes

### Key Features Implemented
✅ Complete auth flow with dummy payments
✅ Multi-step calculator with validation
✅ Dynamic marketplace with filtering
✅ Responsive bottom tab navigation
✅ Certificate generation mock
✅ Educational content system
✅ User profile & settings

### Next Steps
1. Connect real APIs
2. Add real payment integration
3. Implement push notifications
4. Add offline capabilities
5. Setup analytics

---

**Built for GreenMark - Making Sustainability Simple** 🌱
# greenmark
