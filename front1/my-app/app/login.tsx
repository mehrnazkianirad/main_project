import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { loginWithEmail, loginWithSocial } from '../actions/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { loginScreenStyles } from '../components/style-sheet';
import AuthButtons from './AuthButtonsSignUp';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const success = await loginWithEmail(email, password);
    if (success) router.replace('/home');
  };

  const handleSocialLogin = async (provider: string, token: string) => {
    const success = await loginWithSocial(provider, token);
    if (success) router.replace('/home');
  };

  return (
    <LinearGradient
      colors={['rgb(0,0,0)', '#191414']}
      style={loginScreenStyles.container}
    >
      <View style={loginScreenStyles.form}>
        <Text style={loginScreenStyles.title}>Login to Boxi</Text>

        <TextInput
          style={loginScreenStyles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={loginScreenStyles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <AuthButtons
          onSuccess={(token: string) => handleSocialLogin('google', token)}
        />

        <Button title="Login" onPress={handleLogin} />

        <Text style={{ color: '#ccc', marginTop: 20, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Text
            style={{ color: '#1e90ff', textDecorationLine: 'underline' }}
            onPress={() => router.replace('/signup')}
          >
            Sign Up
          </Text>
          .
        </Text>
      </View>
    </LinearGradient>
  );
}
