import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const TOKEN_KEY = 'spotify_token';
const BASE_URL = 'http://127.0.0.1:8000'; 

// ------------------- Token Functions -------------------

export const getSpotifyToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error('Error getting token:', err);
    return null;
  }
};

export const saveSpotifyToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (err) {
    console.error('Error saving token:', err);
  }
};

export const deleteSpotifyToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error('Error deleting token:', err);
  }
};

// ------------------- Auth Actions -------------------

export const signupWithEmail = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return true;
    } else {
      const error = await response.json();
      console.error('Signup failed:', error);
      Alert.alert('Signup Failed', 'Please check your email and password.');
      return false;
    }
  } catch (err) {
    console.error('Signup error:', err);
    Alert.alert('Error', 'Something went wrong during signup.');
    return false;
  }
};

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      await saveSpotifyToken(data.access);
      return true;
    } else {
      const error = await response.json();
      console.error('Login failed:', error);
      Alert.alert('Login Failed', 'Invalid email or password.');
      return false;
    }
  } catch (err) {
    console.error('Login error:', err);
    Alert.alert('Error', 'Something went wrong during login.');
    return false;
  }
};

export const loginWithSocial = async (
  provider: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/social-login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, token }),
    });

    if (response.ok) {
      const data = await response.json();
      await saveSpotifyToken(data.access);
      return true;
    } else {
      const error = await response.text();
      console.error('Social login failed:', error);
      Alert.alert('Login Failed', 'Social login failed.');
      return false;
    }
  } catch (err) {
    console.error('Social login error:', err);
    Alert.alert('Error', 'Something went wrong during social login.');
    return false;
  }
};

export const signupWithSocial = async (
  provider: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/social-signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, token }),
    });

    if (response.ok) {
      const data = await response.json();
      await saveSpotifyToken(data.access);
      return true;
    } else {
      const error = await response.text();
      console.error('Social Signup Failed:', error);
      Alert.alert('Signup Failed', `Could not create account via ${provider}`);
      return false;
    }
  } catch (err) {
    console.error('Social Signup Error:', err);
    Alert.alert('Error', 'Something went wrong with social signup.');
    return false;
  }
};
