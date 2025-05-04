import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Switch,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Use Ionicons for our input icons
import { AuthStackParamList, useAuth } from '../navigation/RootNavigator';

// Assume logo is placed in assets
const logo = require('../../assets/logo.png');

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleVerify = () => {
    // Validation checks
    if (!email.trim()) {
      alert('Please enter your university email');
      return;
    }
    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!studentId.trim()) {
      alert('Please enter your student ID');
      return;
    }
    if (!agreed) {
      alert('Please confirm you understand the cost-recovery policy');
      return;
    }
    
    // Success - log in
    login();
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
              Create Your Account
            </Text>
          </View>

          {/* Input Fields - With Icons and Better Styling */}
          <View className="w-full mb-6 space-y-5">
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

            {/* Full Name Input */}
            <View>
              <Text className="text-uride-text-secondary text-base mb-2 font-semibold ml-1">
                Full Name
              </Text>
              <View className="flex-row items-center bg-uride-input-bg rounded-xl overflow-hidden border border-uride-border">
                <View className="p-3 pl-4">
                  <Ionicons name="person-outline" size={22} color="#00C853" />
                </View>
                <TextInput
                  className="flex-1 p-4 text-uride-text-primary text-base"
                  placeholder="John Smith"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  placeholderTextColor="#757575"
                />
              </View>
            </View>

            {/* Student ID Input */}
            <View>
              <Text className="text-uride-text-secondary text-base mb-2 font-semibold ml-1">
                Student ID
              </Text>
              <View className="flex-row items-center bg-uride-input-bg rounded-xl overflow-hidden border border-uride-border">
                <View className="p-3 pl-4">
                  <Ionicons name="card-outline" size={22} color="#00C853" />
                </View>
                <TextInput
                  className="flex-1 p-4 text-uride-text-primary text-base"
                  placeholder="********"
                  value={studentId}
                  onChangeText={setStudentId}
                  secureTextEntry={true}
                  placeholderTextColor="#757575"
                />
              </View>
            </View>
          </View>

          {/* Agreement Switch */}
          <View className="flex-row items-center mb-8 mx-1">
            <Switch
              trackColor={{ false: '#444', true: '#00A04080' }}
              thumbColor={agreed ? '#00C853' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setAgreed}
              value={agreed}
            />
            <Text className="text-uride-text-secondary text-base ml-3 flex-1">
              I understand URide is for cost-recovery carpooling, not profit.
            </Text>
          </View>

          {/* Verify Button - with shadow/elevation effect */}
          <Pressable
            onPress={handleVerify}
            className="w-full bg-uride-green rounded-xl py-4 items-center shadow-md"
            style={({ pressed }) => [
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
              Verify & Continue
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 