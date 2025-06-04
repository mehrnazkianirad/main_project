import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { loginWithSocial, signupWithEmail } from '../actions/auth';
import { loginScreenStyles as styles } from '../components/style-sheet';
import AuthButtons from './AuthButtonsSignUp';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSocialSignup = async (provider: string, token: string) => {
    const success = await loginWithSocial(provider, token);  
    if (success) {
      router.replace('/home');
    } else {
      Alert.alert('Signup Failed', `Could not create account via ${provider}`);
    }
  };

  const handleEmailSignup = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter email and password.');
      return;
    }
    const success = await signupWithEmail(email, password);  
    if (success) {
      router.replace('/home');
    } else {
    }
  };

  return (
    <LinearGradient colors={['rgb(0,0,0)', '#191414']} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign up to Boxi</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button title="Sign Up" onPress={handleEmailSignup} />
        <AuthButtons
          onSuccess={(token: string, provider: string) => {
            handleSocialSignup(provider, token);
          }}
        />
      </View>
    </LinearGradient>
  );
}
