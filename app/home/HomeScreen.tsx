import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-uride-bg-dark">
      <Text className="text-xl text-uride-text-primary">
        Home Screen (Dashboard)
      </Text>
      {/* Add dashboard elements: Map preview?, Quick actions?, Upcoming rides? */}
    </View>
  );
} 