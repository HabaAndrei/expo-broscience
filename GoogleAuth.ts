import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';


WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {

  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);

  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

  // console.log({iosClientId, androidClientId, webClientId}, '------');

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



