import React from 'react'
import { View, Text, Button } from 'react-native';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {



  const actionCodeSettings = {
    url: 'https://a3bc-2a02-2f05-f004-aa00-60d2-fd80-f50-99b0.ngrok-free.app',
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    // linkDomain: 'a3bc-2a02-2f05-f004-aa00-60d2-fd80-f50-99b0.ngrok-free.app'
  };

  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  function test(){


    const auth = getAuth();
    console.log(auth);
    const email = 'habaconstantin45@gmail.com';
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });

  }

  return (
    <View>
      <Text>okokokok</Text>
      <Button onPress={test} title='Press'></Button>
    </View>
  )
}

export default index