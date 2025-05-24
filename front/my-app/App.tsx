import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SpotifyProvider } from './context/SpotifyContext';
import HomeScreen from '../my-app/app/(tabs)/home';
import { View, Text, Image, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://path-to-your-logo.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  version: {
    fontSize: 16,
    color: '#555',
  },
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <SpotifyProvider>
        <HomeScreen />
      </SpotifyProvider>
    </Provider>
  );
}
