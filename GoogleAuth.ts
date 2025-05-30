import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from './firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const auth = getAuth(firebaseApp);

  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

  console.log({iosClientId, androidClientId, webClientId}, '------');

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: iosClientId,
    androidClientId: androidClientId,
    webClientId: webClientId,
    useProxy: true,
    responseType: 'id_token',
    scopes: ['openid', 'profile', 'email'],
  });

  console.log('Redirect URI:', request?.redirectUri);


  useEffect(() => {
    if (response?.type === 'success') {
      console.log({response});
      const id_token = response?.params?.id_token;
      console.log({id_token});
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(console.error);
    }
  }, [response]);

  return {
    signIn: () => promptAsync(),
    request,
  };
}
