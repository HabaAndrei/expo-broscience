import { EnvConfig } from './EnvConfig';
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';

// singleton
class Firebase {

  private static instance: Firebase;

  firebaseConfig = {
    apiKey: EnvConfig.get('firebaseApiKey'),
    authDomain: EnvConfig.get('firebaseAuthDomain'),
    projectId: EnvConfig.get('firebaseProjectId'),
    storageBucket: EnvConfig.get('firebaseStorageBucket'),
    messagingSenderId: EnvConfig.get('firebaseMessagingSenderId'),
    appId: EnvConfig.get('firebaseAppId'),
  };
  auth;

  constructor(){
    if (!Firebase.instance){
      Firebase.instance = this;
      const app = initializeApp(this.firebaseConfig);
      const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
      this.auth = auth;
    }
    return Firebase.instance;
  }
}

export { Firebase };