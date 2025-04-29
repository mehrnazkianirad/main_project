import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text}from "react-native";
import { useFonts } from 'expo-font';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from '../components/Home';  

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator(); 

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }, 3000);
    };

    prepareApp();
  }, []);

  if (!appReady || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="+not-found"
          component={() => <View><Text>Not Found</Text></View>}  
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
