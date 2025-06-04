import React, { useState, useEffect } from 'react';
import { View, Button, Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function AuthButtons({ onSuccess }: { onSuccess: (token: string, provider: string) => void }) {
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    const checkAppleAuth = async () => {
      const available = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(available);
    };

    if (Platform.OS === 'ios') {
      checkAppleAuth();
    }
  }, []);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      onSuccess(authentication?.accessToken || '', 'google');
    }
  }, [response]);

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      onSuccess(credential.identityToken || '', 'apple');
    } catch (e) {
      console.error('Apple login error:', e);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Button
        title="Continue with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
      {Platform.OS === 'ios' && appleAuthAvailable && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
          cornerRadius={5}
          style={{ width: '100%', height: 44, marginTop: 10 }}
          onPress={handleAppleLogin}
        />
      )}
    </View>
  );
}
