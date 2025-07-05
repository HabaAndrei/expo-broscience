import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';


// Simple email validation
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Verify if is base 64
export function isBase64(str: string): string|boolean {
  if (typeof str !== "string") {
    return false;
  }
  str = str.replace('data:image/jpeg;base64,', '')
  const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return base64Regex.test(str);
}

export async function base64Image(image: string){
  if (Platform.OS === 'web') return image;

  if ( !isBase64(image) ) {
    let base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
    if (!base64.includes('data:image/jpeg;base64,')) {
      image = 'data:image/jpeg;base64,' + base64;
    } else {
      image = base64;
    }
  }
  return image;
}

export const ingredientsLabels: any = {
  calories: {
    title: '',
    paragraph: 'Calories per image',
    label: 'Calories'
  },
  carbs: {
    title: ' g',
    paragraph: 'Carbs per image',
    label: 'Carbs'
  },
  protein: {
    title: ' g',
    paragraph: 'Protein per image',
    label: 'Protein'
  },
  fats: {
    title: ' g',
    paragraph: 'Fats per image',
    label: 'Fats'
  },
  total_quantity: {
    title: ' g',
    paragraph: 'Total quantity per image',
    label: 'Total quantity'
  }
}