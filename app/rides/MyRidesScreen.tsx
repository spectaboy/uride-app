import React from 'react';
import { View, Text } from 'react-native';

export default function MyRidesScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-uride-white dark:bg-uride-black">
      <Text className="text-xl text-uride-black dark:text-uride-white">
        My Rides Screen
      </Text>
      {/* Add list of upcoming/past rides (as driver/rider) */}
    </View>
  );
} 