import 'react-native-url-polyfill/auto'; // Polyfill for URL API
// App.tsx - Main Entry Point
import './global.css'; // Import Tailwind base styles
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './app/navigation/RootNavigator'; // Correct path
// Import Firebase initialization if needed here
// import './services/firebaseConfig'; // Example

export default function App() {
  // Add theme/auth providers here if needed (e.g., Context API, Zustand)

  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar style="light" />{/* Set status bar text/icons to light */}
    </SafeAreaProvider>
  );
}
