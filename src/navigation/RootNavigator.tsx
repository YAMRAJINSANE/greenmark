import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
    }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

// Onboarding Stack
const OnboardingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="BusinessType" component={BusinessTypeScreen} />
    <Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
  </Stack.Navigator>
);

// Calculator Stack
const CalculatorStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="CalculatorElectricity" component={CalculatorElectricityScreen} />
    <Stack.Screen name="CalculatorLPG" component={CalculatorLPGScreen} />
    <Stack.Screen name="CalculatorWasteTransport" component={CalculatorWasteTransportScreen} />
    <Stack.Screen name="EmissionsResult" component={EmissionsResultScreen} />
  </Stack.Navigator>
);

// Offset Stack
const OffsetStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
    <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    <Stack.Screen name="PurchaseCredits" component={PurchaseCreditsScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="Success" component={SuccessScreen} />
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
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : !isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
