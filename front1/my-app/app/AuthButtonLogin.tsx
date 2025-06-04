import React, { useEffect } from 'react';
import { View, Button, Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

interface AuthButtonsProps {
  onSuccess: (provider: string, token: string) => void;
}

export default function AuthButtons({ onSuccess }: AuthButtonsProps) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      onSuccess('google', authentication?.accessToken || '');
    }
  }, [response]);

  return (
    <View style={{ marginTop: 20 }}>
      <Button title="Continue with Google" onPress={() => promptAsync()} />

      {Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: '100%', height: 44, marginTop: 10 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              onSuccess('apple', credential.identityToken || '');
            } catch (e) {
              console.error('Apple login error:', e);
            }
          }}
        />
      )}
    </View>
  );
}
