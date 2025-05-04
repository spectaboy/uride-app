import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackParamList, useAuth } from '../navigation/RootNavigator';

// Assume logo is placed in assets
const logo = require('../../assets/logo.png');

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    setLoading(true);
    
    try {
      // TODO: Implement actual Firebase login logic here
      setTimeout(() => {
        // Simulate successful login after a brief delay
        login();
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.message || "An unknown error occurred");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-uride-bg-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-8 py-10"
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo and Title */}
          <View className="items-center mb-10">
            <Image
              source={logo}
              className="w-28 h-28 mb-5"
              resizeMode="contain"
            />
            <Text className="text-uride-text-primary text-3xl font-bold text-center">
              Welcome Back
            </Text>
            <Text className="text-uride-text-secondary text-lg mt-2 text-center">
              Sign in to continue
            </Text>
          </View>

          {/* Input Fields - With Icons and Better Styling */}
          <View className="w-full mb-8 space-y-5">
            {/* Email Input */}
            <View>
              <Text className="text-uride-text-secondary text-base mb-2 font-semibold ml-1">
                University Email
              </Text>
              <View className="flex-row items-center bg-uride-input-bg rounded-xl overflow-hidden border border-uride-border">
                <View className="p-3 pl-4">
                  <Ionicons name="mail-outline" size={22} color="#00C853" />
                </View>
                <TextInput
                  className="flex-1 p-4 text-uride-text-primary text-base"
                  placeholder="name@ucalgary.ca"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#757575"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-uride-text-secondary text-base mb-2 font-semibold ml-1">
                Password
              </Text>
              <View className="flex-row items-center bg-uride-input-bg rounded-xl overflow-hidden border border-uride-border">
                <View className="p-3 pl-4">
                  <Ionicons name="lock-closed-outline" size={22} color="#00C853" />
                </View>
                <TextInput
                  className="flex-1 p-4 text-uride-text-primary text-base"
                  placeholder="********"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholderTextColor="#757575"
                />
              </View>
            </View>
          </View>

          {/* Sign In Button - with shadow/elevation effect */}
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-600' : 'bg-uride-green'} rounded-xl py-4 items-center shadow-md mb-5`}
            style={({ pressed }) => !loading && [
              {
                opacity: pressed ? 0.9 : 1,
                elevation: pressed ? 2 : 5,
                shadowColor: '#00C853',
                shadowOffset: { width: 0, height: pressed ? 2 : 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              },
            ]}
          >
            <Text className="text-uride-text-primary font-bold text-xl">
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </Pressable>

          {/* Back to Onboarding */}
          <Pressable 
            onPress={() => navigation.goBack()} 
            className="items-center mt-4"
          >
            <View className="flex-row items-center">
              <Ionicons name="arrow-back-outline" size={18} color="#A0A0A0" />
              <Text className="text-uride-text-secondary text-base ml-1">
                Back to Registration
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 