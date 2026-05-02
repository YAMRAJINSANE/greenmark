# GreenMark Development Guide

A complete guide for setting up, developing, and deploying the GreenMark mobile app.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [API Integration](#api-integration)
5. [Payment Integration](#payment-integration)
6. [Deployment](#deployment)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** v16+ ([Download](https://nodejs.org))
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **XCode** (for iOS development)
- **Android Studio** (for Android development)

### Initial Setup

```bash
# 1. Navigate to project
cd GREENMARK

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Run on device/emulator
# For iOS: Press 'i'
# For Android: Press 'a'
# For Web: Press 'w'
```

### Environment Variables

Create `.env` file in root:

```env
# API
API_BASE_URL=https://api.greenmark.io/v1
API_TIMEOUT=30000

# Payments
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Analytics
ANALYTICS_ENABLED=true
ANALYTICS_KEY=your_analytics_key

# Logging
LOG_LEVEL=debug
```

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── ...
├── screens/             # App screens
│   ├── auth/           # Authentication screens
│   ├── onboarding/     # Onboarding flow
│   ├── calculator/     # Emissions calculator
│   ├── offset/         # Offsetting flow
│   └── app/            # Main app screens
├── navigation/          # React Navigation setup
│   └── RootNavigator.tsx
├── theme/              # Design system
│   └── index.ts        # Colors, typography, spacing
├── data/               # Mock data
│   └── dummy.ts
├── constants/          # App constants
│   └── index.ts
├── utils/              # Helper functions
│   └── index.ts
└── services/           # (Future) API services
    └── api.ts
```

---

## Development Workflow

### Creating New Screens

1. **Create component file**:

```typescript
// src/screens/app/NewScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { ScreenContainer } from '../../components';

interface NewScreenProps {
  onAction: () => void;
}

export const NewScreen: React.FC<NewScreenProps> = ({ onAction }) => {
  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>New Screen</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
});

export default NewScreen;
```

2. **Add to navigation**:

```typescript
// src/navigation/RootNavigator.tsx
import NewScreen from '../screens/app/NewScreen';

// Add to stack
<Stack.Screen name="NewScreen" component={NewScreen} />
```

### Creating Reusable Components

```typescript
// src/components/NewComponent.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';

interface NewComponentProps {
  children: React.ReactNode;
}

export const NewComponent: React.FC<NewComponentProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
  },
});

export default NewComponent;
```

### Using Dummy Data

```typescript
import { DUMMY_USER, DUMMY_PROJECTS } from '../../data/dummy';

// Use in component
const user = DUMMY_USER;
const projects = DUMMY_PROJECTS;
```

---

## API Integration

### Creating API Service

```typescript
// src/services/api.ts
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../constants';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
    });
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password });
  }

  async signup(data: any) {
    return this.api.post('/auth/signup', data);
  }

  // Projects endpoints
  async getProjects() {
    return this.api.get('/projects');
  }

  async getProjectDetail(id: string) {
    return this.api.get(`/projects/${id}`);
  }

  // Add more endpoints as needed
}

export default new ApiService();
```

### Using API Service

```typescript
import ApiService from '../../services/api';

const handleLogin = async () => {
  try {
    const response = await ApiService.login(email, password);
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Error Handling

```typescript
import { errorHandling } from '../../utils';

try {
  const data = await someApiCall();
} catch (error) {
  const message = errorHandling.getErrorMessage(error);
  errorHandling.logError(error, 'API Call');
}
```

---

## Payment Integration

### Dummy Payment Flow (Current)

The app currently uses a dummy payment system:

```typescript
// src/screens/offset/PaymentScreen.tsx
const handlePay = async () => {
  setLoading(true);
  // Simulate payment API call
  setTimeout(() => {
    const transactionId = `TXN-${Date.now()}`;
    onPaymentSuccess(transactionId);
    setLoading(false);
  }, 2000);
};
```

### Real Payment Integration (Razorpay)

```typescript
// Create payment service
// src/services/paymentService.ts
import RazorpayCheckout from 'react-native-razorpay';

class PaymentService {
  async processPayment(amount: number, email: string) {
    const options = {
      description: 'GreenMark Carbon Credits',
      image: require('../../assets/logo.png'),
      currency: 'INR',
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      name: 'GreenMark',
      prefill: {
        email: email,
      },
      theme: { color: '#2BA3A3' },
    };

    return new Promise((resolve, reject) => {
      RazorpayCheckout.open(options)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}

export default new PaymentService();
```

### Update Payment Screen

```typescript
import PaymentService from '../../services/paymentService';

const handlePay = async () => {
  try {
    setLoading(true);
    const response = await PaymentService.processPayment(amount, email);
    onPaymentSuccess(response.razorpay_payment_id);
  } catch (error) {
    console.error('Payment failed:', error);
  } finally {
    setLoading(false);
  }
};
```

---

## Deployment

### Android Build

```bash
# Create signed APK
eas build --platform android

# Or using Expo
expo build:android -t apk

# Check build status
eas build:list
```

### iOS Build

```bash
# Create IPA
eas build --platform ios

# Or using Expo
expo build:ios

# Check build status
eas build:list
```

### EAS Submission

```bash
# Submit to Play Store
eas submit --platform android --latest

# Submit to App Store
eas submit --platform ios --latest
```

### Web Deployment

```bash
# Build web version
npm run build:web

# Deploy to Vercel
vercel

# Or Netlify
netlify deploy --prod --dir=dist
```

---

## Testing

### Unit Tests

```bash
# Add Jest
npm install --save-dev jest @testing-library/react-native

# Run tests
npm test
```

### E2E Tests

```bash
# Add Detox
npm install --save-dev detox-cli detox

# Run tests
detox test
```

---

## Debugging

### Enable Debug Mode

```typescript
// Enable in development
if (__DEV__) {
  console.log = () => {};
  console.warn = () => {};
}
```

### Use React DevTools

```bash
# Install
npm install --save-dev react-devtools

# Run
react-devtools
```

### Remote Debugging

In Expo:
- Shake device to open Developer Menu
- Select "Debug Remote JS"

---

## Performance Optimization

### Code Splitting

```typescript
// Use lazy loading
import { lazy, Suspense } from 'react';

const HeavyScreen = lazy(() => import('./screens/HeavyScreen'));

<Suspense fallback={<LoadingScreen />}>
  <HeavyScreen />
</Suspense>
```

### Image Optimization

```typescript
// Use optimized images
import { Image } from 'react-native';

<Image
  source={require('./logo.png')}
  style={{ width: 200, height: 200 }}
  resizeMode="contain"
/>
```

### List Optimization

```typescript
// Use FlatList with proper configs
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  initialNumToRender={10}
/>
```

---

## Best Practices

1. **Component Organization**
   - One component per file
   - Related components in same folder
   - Clear naming conventions

2. **State Management**
   - Use React Hooks for local state
   - Consider Redux/Context for global state
   - Avoid prop drilling

3. **Performance**
   - Use React.memo for expensive components
   - Optimize re-renders with useMemo/useCallback
   - Lazy load heavy screens

4. **Code Quality**
   - Use TypeScript strictly
   - Follow ESLint rules
   - Write meaningful comments

5. **Security**
   - Never hardcode API keys
   - Use environment variables
   - Validate user input
   - Secure storage for tokens

---

## Troubleshooting

### Issue: Blank white screen
**Solution:** Check for JavaScript errors
```bash
npm start -- --reset-cache
```

### Issue: Module not found
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### Issue: Build fails
**Solution:** Clear build cache
```bash
eas build:cancel # Cancel ongoing builds
expo prebuild --clean
```

---

## Resources

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **React Navigation**: https://reactnavigation.org
- **Razorpay**: https://razorpay.com/docs
- **TypeScript**: https://www.typescriptlang.org

---

**Happy Coding! 🚀**
