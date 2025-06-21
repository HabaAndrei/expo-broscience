import { EnvConfig } from './EnvConfig';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, Firestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import {signOut, deleteUser, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, Auth
} from "firebase/auth";
import * as Device from 'expo-device';
import { StorageService } from '@/providers/StorageService';


const firebaseConfig = {
  apiKey: EnvConfig.get('firebaseApiKey'),
  authDomain: EnvConfig.get('firebaseAuthDomain'),
  projectId: EnvConfig.get('firebaseProjectId'),
  storageBucket: EnvConfig.get('firebaseStorageBucket'),
  messagingSenderId: EnvConfig.get('firebaseMessagingSenderId'),
  appId: EnvConfig.get('firebaseAppId'),
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// singleton
class Firebase {

  private static instance: Firebase | undefined = undefined;

  constructor(){
    if (!Firebase.instance){
      Firebase.instance = this;
    }
    return Firebase.instance;
  }

  // firebase auth =>


  async _createUserWithEmailAndPassword(
    {email, password, firstName, secondName}:
    {email: string, password: string, firstName: string, secondName: string}
  ){
    return this.catchAndStoreError(async ()=>{
      if ( !auth ) {
        throw new Error("auth is not defined at _createUserWithEmailAndPassword function");
      };
      const rez: any = await createUserWithEmailAndPassword(auth, email, password);
      const {uid} = rez.user;
      const {createdAt} = rez.user.metadata;
      const initialInformations = await StorageService.getStorage("initialInformations");
      if (!initialInformations.isResolved || !initialInformations.data) throw new Error("couldn't get initialInformations from async storage")
      await this.addIntoDatabase({
        database: 'users',
        id: uid,
        columnsWithValues: {
          uid, createdAt, email, firstName, secondName, email_verified: false,
          ...initialInformations.data.userDetails
        }
      });
      await this.addIntoDatabase({
        database: 'usersPlan',
        id: uid,
        columnsWithValues: initialInformations.data.plan
      });
      return {isResolved: true, data: rez};
    })
  }

  async _signInWithEmailAndPassword(
    {email, password}: {email: string, password: string}
  ){
    return this.catchAndStoreError(async ()=>{
      if ( !auth ) {
        throw new Error("auth is not defined at _signInWithEmailAndPassword function");
      };
      const rez = await signInWithEmailAndPassword(auth, email, password)
      return {isResolved: true, data: rez};
    })
  }

  async reAuth(password: string){
    return this.catchAndStoreError(async ()=>{
      const user = auth?.currentUser;
      if ( !user || !user.email ) {
        throw new Error("user is not defined at reAuth function");
      };
      const {email} = user;
      const credential = EmailAuthProvider.credential(email, password)
      await reauthenticateWithCredential(user, credential);
      return {isResolved: true};
    })
  }

  async _deleteUser(){
    return this.catchAndStoreError(async ()=>{
      if ( !auth ) {
        throw new Error("auth is not defined at _deleteUser function");
      };
      const user = auth.currentUser;
      if ( !user ) {
        throw new Error("this user is not defined at _deleteUser function");
      };
      await deleteUser(user);
      return {isResolved: true};
    })
  }

  async _signOut(){
    return this.catchAndStoreError(async ()=>{
      if ( !auth ) {
        throw new Error("auth is not defined at _signOut function");
      };
      await signOut(auth);
      return {isResolved: true};
    })
  }

  async _sendPasswordResetEmail(email: string){
    return this.catchAndStoreError(async ()=>{
      if ( !auth ) {
        throw new Error("auth is not defined at _sendPasswordResetEmail function");
      };
      await sendPasswordResetEmail(auth, email)
      return {isResolved: true};
    })
  }


  // firebase firestore =>


  async storeErr(mesErr: string | any){
    const {modelName, modelId, brand} = Device;
    let rezFin = {};
    try{
      if ( !auth || !db) {
        throw new Error("auth or db are not defined at storeErr function");
      };
      const uid = auth?.currentUser?.uid;
      await addDoc(collection(db, "errors"), {uid, modelName, modelId, brand, mesErr});
      rezFin = {isResolved: true};
    }catch(err: any){
      this.storeErr(err?.message)
      rezFin = {isResolved: false, err};
    }
    return rezFin
  }

  async catchAndStoreError(cb: ()=>{}){
    try{
      const data = await cb();
      return data;
    }catch(err: any){
      console.log('catchAndStoreError: ', err);
      if ( !auth || !db) {
        return {isResolved: false, err: "auth or db are not defined at storeErr function"}
      };
      const uid = auth?.currentUser?.uid;
      const {modelName, modelId, brand} = Device;
      addDoc(collection(db, "errors"), {
        uid: uid || 'user not connected',
        modelName,
        modelId,
        brand,
        mesErr: err?.message,
        createdAt: new Date()
      });
      return {isResolved: false, err: err.message}
    }
  }

  async getDetailsUser(uid: string){
    return this.catchAndStoreError(async ()=>{
      if ( !auth || !db) {
        throw new Error("auth or db are not defined at getDetailsUser function");
      };
      const docRef = doc(db, "users", uid);
      const dataFromDB = await getDoc(docRef);
      const data = dataFromDB.data();
      return {data};
    })
  }

  async addIntoDatabase(
    {database, id, columnsWithValues}:
    {database: string, id: string | number, columnsWithValues: object}
  ){
    return this.catchAndStoreError(async ()=>{
      if ( !auth || !db) {
        throw new Error("auth or db are not defined at addIntoDatabase function");
      };
      if (id) {
        await setDoc(doc(db, database, id), columnsWithValues);
      }else{
        await addDoc(collection(db, database), columnsWithValues);
      }
      return {isResolved: true};
    })
  }


}

export { Firebase, db, auth };