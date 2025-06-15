import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {

  static async getStorage(key: string) {
    const storedTasks: any = await AsyncStorage.getItem(key);
    const dataParse = JSON.parse(storedTasks);
    return { isResolved: true, data: dataParse };
  }

  static async addStorage(key: string, data: any) {
    let keyString;
    let dataString;
    if (typeof(key) !== "string") {
      keyString = JSON.stringify(key);
    } else {
      keyString = key;
    }
    if (typeof(data) !== "string") {
      dataString = JSON.stringify(data);
    } else {
      dataString = data;
    }
    await AsyncStorage.setItem(keyString, dataString);
    return { isResolved: true };
  }

  static async removeStorage(key: string) {
    await AsyncStorage.removeItem(key);
    return { isResolved: true };
  }

  static async getAllStorage() {
    const keys = await AsyncStorage.getAllKeys();
    return { isResolved: true, data: keys };
  }

  static async deleteStorage() {
    await AsyncStorage.clear();
    return { isResolved: true };
  }

  static async multiGetStorage(arrayOfKeys: string[]) {
    const data = await AsyncStorage.multiGet(arrayOfKeys);
    return { isResolved: true, data: data };
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