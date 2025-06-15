import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {

  static async getStorage(key: string) {
    const storedTasks: any = await AsyncStorage.getItem(key);
    const dataParse = JSON.parse(storedTasks);
    return { isResolved: true, data: dataParse };
  }

  static async addStorage(key: string, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return { isResolved: true };
  }

  static async removeStorage(key: string) {
    await AsyncStorage.removeItem(key);
    return { isResolved: true };
  }

  static async getAllStorageKeys() {
    const keys = await AsyncStorage.getAllKeys();
    return { isResolved: true, data: keys };
  }

  static async deleteStorage() {
    await AsyncStorage.clear();
    return { isResolved: true };
  }

  static async multiGetStorage(arrayOfKeys: string[]) {
    let data: any = await AsyncStorage.multiGet(arrayOfKeys);
    data = data.map((ar: string[])=>{
      ar[1] = JSON.parse(ar[1]);
      return ar;
    })
    return { isResolved: true, data };
  }

  static async multiSetStorage(arrayOfArrays: any[][]) {
    const serializedArray: any = arrayOfArrays.map(([key, value]) => [key, JSON.stringify(value)]);
    await AsyncStorage.multiSet(serializedArray);
    return { isResolved: true };
  }

  static async multiRemoveStorage(arrayOfKeys: string[]) {
    await AsyncStorage.multiRemove(arrayOfKeys);
    return { isResolved: true };
  }
}
export { StorageService }