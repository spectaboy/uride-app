import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer, RouteProp, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming usage of Expo vector icons

// Import Screens (placeholders - create these files next)
import OnboardingScreen from '../auth/OnboardingScreen';
import LoginScreen from '../auth/LoginScreen';
import HomeScreen from '../home/HomeScreen';
import SearchRidesScreen from '../rides/SearchRidesScreen';
import PostRideScreen from '../rides/PostRideScreen';
import MyRidesScreen from '../rides/MyRidesScreen';
import ProfileScreen from '../profile/ProfileScreen';

// Import Theme/Colors (placeholder)
import { colors } from '../../constants/theme'; // Path to uride-app/constants/theme

// Custom Dark Theme using explicit values from tailwind.config.js
const UrideDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#00C853',       // uride-green
    background: '#121212',    // uride-bg-dark
    card: '#1E1E1E',          // uride-bg-card
    text: '#FFFFFF',          // uride-text-primary
    border: '#333333',        // uride-border
    notification: DarkTheme.colors.notification,
  },
};

// Create a simple Auth context (replace with robust state management later)
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Define Navigation Param Lists
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Post: undefined;
  MyRides: { screen?: string }; // Example: Allow deep linking
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined; // Nest Auth stack
  Main: undefined; // Nest Main tab navigator
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// --- Navigators ---

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabNavigator() {
  const activeColor = '#00C853';         // uride-green
  const inactiveColor = '#A0A0A0';       // uride-text-secondary
  const tabBarBg = '#121212';           // uride-bg-dark
  const borderTopColor = '#333333';    // uride-border

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<MainTabParamList, keyof MainTabParamList> }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: borderTopColor,
        },
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'MyRides') {
            iconName = focused ? 'list' : 'list-outline'; // Or 'car-sport' : 'car-sport-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          // @ts-ignore - Ionicons name type mismatch is common, resolve later if needed
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchRidesScreen} options={{ title: 'Search Rides' }}/>
      <Tab.Screen name="Post" component={PostRideScreen} options={{ title: 'Post a Ride' }}/>
      <Tab.Screen name="MyRides" component={MyRidesScreen} options={{ title: 'My Rides' }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  const { isAuthenticated } = useAuth();

  return (
    // Apply the custom dark theme to the NavigationContainer
    <NavigationContainer theme={UrideDarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap the navigation in an AuthProvider
export default function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login/logout actions
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <AppNavigation />
    </AuthContext.Provider>
  );
} 