import React from 'react';
import { View, Text, Button } from 'react-native';
// import { styled } from 'nativewind';
// import { signOut } from '../../services/firebaseAuth'; // Placeholder

export default function ProfileScreen() {

  const handleLogout = async () => {
    console.log("Logout attempt");
    try {
      // TODO: Implement Firebase Sign Out
      // await signOut();
      // Auth state listener in RootNavigator should handle navigation
      console.log("Logout successful (placeholder)");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-uride-white dark:bg-uride-black p-4">
      <Text className="text-xl mb-6 text-uride-black dark:text-uride-white">
        Profile Screen
      </Text>
      {/* Add profile details, settings, preferences */}
      <Button
        title="Logout"
        onPress={handleLogout}
        color="#FF0000" // Example Red
      />
    </View>
  );
} 