import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import BusinessTypeScreen from '../screens/onboarding/BusinessTypeScreen';
import BusinessDetailsScreen from '../screens/onboarding/BusinessDetailsScreen';
import CalculatorElectricityScreen from '../screens/calculator/CalculatorElectricityScreen';
import CalculatorLPGScreen from '../screens/calculator/CalculatorLPGScreen';
import CalculatorWasteTransportScreen from '../screens/calculator/CalculatorWasteTransportScreen';
import EmissionsResultScreen from '../screens/calculator/EmissionsResultScreen';
import MarketplaceScreen from '../screens/offset/MarketplaceScreen';
import ProjectDetailScreen from '../screens/offset/ProjectDetailScreen';
import PurchaseCreditsScreen from '../screens/offset/PurchaseCreditsScreen';
import PaymentScreen from '../screens/offset/PaymentScreen';
import SuccessScreen from '../screens/offset/SuccessScreen';
import DashboardScreen from '../screens/app/DashboardScreen';
import LearnScreen from '../screens/app/LearnScreen';
import ProfileScreen from '../screens/app/ProfileScreen';

// Theme
import { COLORS } from '../theme';

const Stack = createStackNavigator<any>();
const Tab = createBottomTabNavigator<any>();
const screen = (component: React.ComponentType<any>) => component;

interface AuthStackProps {
  onAuthenticated: () => void;
}

interface OnboardingStackProps {
  onOnboarded: () => void;
}

// Auth Stack
const AuthStack: React.FC<AuthStackProps> = ({ onAuthenticated }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
    }}
  >
    <Stack.Screen name="Splash">
      {({ navigation }) => (
        <SplashScreen
          onGetStarted={() => navigation.navigate('SignUp')}
          onLogin={() => navigation.navigate('Login')}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {({ navigation }) => (
        <LoginScreen
          onLogin={onAuthenticated}
          onSignUp={() => navigation.navigate('SignUp')}
          onForgotPassword={() => {}}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="SignUp">
      {({ navigation }) => (
        <SignUpScreen
          onSignUp={onAuthenticated}
          onBackToLogin={() => navigation.navigate('Login')}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

// Onboarding Stack
const OnboardingStack: React.FC<OnboardingStackProps> = ({ onOnboarded }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="BusinessType">
      {({ navigation }) => (
        <BusinessTypeScreen onSelect={() => navigation.navigate('BusinessDetails')} />
      )}
    </Stack.Screen>
    <Stack.Screen name="BusinessDetails">
      {() => <BusinessDetailsScreen onContinue={onOnboarded} />}
    </Stack.Screen>
  </Stack.Navigator>
);

// Calculator Stack
const CalculatorStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="CalculatorElectricity" component={screen(CalculatorElectricityScreen)} />
    <Stack.Screen name="CalculatorLPG" component={screen(CalculatorLPGScreen)} />
    <Stack.Screen name="CalculatorWasteTransport" component={screen(CalculatorWasteTransportScreen)} />
    <Stack.Screen name="EmissionsResult" component={screen(EmissionsResultScreen)} />
  </Stack.Navigator>
);

// Offset Stack
const OffsetStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Marketplace" component={screen(MarketplaceScreen)} />
    <Stack.Screen name="ProjectDetail" component={screen(ProjectDetailScreen)} />
    <Stack.Screen name="PurchaseCredits" component={screen(PurchaseCreditsScreen)} />
    <Stack.Screen name="Payment" component={screen(PaymentScreen)} />
    <Stack.Screen name="Success" component={screen(SuccessScreen)} />
  </Stack.Navigator>
);

// App Stack (Authenticated)
const AppStack = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.neutral200,
        borderTopWidth: 1,
        height: 70,
        paddingBottom: 12,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        marginTop: 4,
      },
      tabBarActiveTintColor: COLORS.success,
      tabBarInactiveTintColor: COLORS.neutral600,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
      }}
    />
    <Tab.Screen
      name="Calculator"
      component={CalculatorStack}
      options={{
        tabBarLabel: 'Calculate',
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📊</Text>,
      }}
    />
    <Tab.Screen
      name="Offset"
      component={OffsetStack}
      options={{
        tabBarLabel: 'Offset',
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🌿</Text>,
      }}
    />
    <Tab.Screen
      name="Learn"
      component={LearnScreen}
      options={{
        tabBarLabel: 'Learn',
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📖</Text>,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👤</Text>,
      }}
    />
  </Tab.Navigator>
);

// Root Navigator
const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isLoggedIn ? (
          <Stack.Screen name="Auth">
            {() => <AuthStack onAuthenticated={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        ) : !isOnboarded ? (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingStack onOnboarded={() => setIsOnboarded(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
