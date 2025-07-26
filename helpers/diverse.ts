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
    paragraph: 'Quantity per image',
    label: 'Total quantity'
  }
}

export function calculateBodyFat({ gender, waist, neck, height, hips = 0 }: {
  gender: string, waist: number, neck: number, height: number, hips: number
}) {

  // hips is only for female
  // typical margins of error around ± 3-4%

  if (!['male', 'female'].includes(gender)) {
    throw new Error("Gender must be 'male' or 'female'");
  }

  // Ensure all values are positive numbers
  if ([waist, neck, height, hips].some(val => typeof val !== 'number' || val <= 0)) {
    throw new Error("All measurements must be positive numbers");
  }

  const log10 = (n: number) => Math.log10(n);

  let bodyFat;

  if (gender === 'male') {
    bodyFat = 86.010 * log10(waist - neck)
      - 70.041 * log10(height)
      + 36.76;
  } else {
    bodyFat = 163.205 * log10(waist + hips - neck)
      - 97.684 * log10(height)
      - 78.387;
  }
  return Number(bodyFat.toFixed(2)); // round to 2 decimal places
}

export type PlanInputType = {
  gender: string;
  workouts: number | string;
  height: number | string;
  weight: number | string;
  goal: string;
  age: number | string;
};

export function calculateMacrosAndHealthScore({ gender, workouts, height, weight, age, goal }: PlanInputType ) {
  // --- Calculate BMR ---
  let BMR;
  weight = Number(weight);
  height = Number(height);
  age = Number(age);
  workouts = Number(workouts)

  if (gender.toLowerCase() === 'male') {
    BMR = 10 *  (weight) + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // --- Activity factor based on workouts ---
  let activityFactor;
  if (workouts === 0) activityFactor = 1.2;
  else if (workouts <= 2) activityFactor = 1.375;
  else if (workouts <= 4) activityFactor = 1.55;
  else if (workouts <= 6) activityFactor = 1.725;
  else activityFactor = 1.9;

  // --- Calculate TDEE ---
  const TDEE = BMR * activityFactor;

  // --- Adjust calories by goal ---
  let calories;
  if (goal === 'Lose weight') calories = TDEE - 500;
  else if (goal === 'Gain weight') calories = TDEE + 300;
  else calories = TDEE;

  // --- Calculate macros ---
  const proteinPerKg = goal === 'Gain weight' ? 2.2 : 1.8;
  const protein = proteinPerKg * weight;
  const proteinCalories = protein * 4;

  const fatCalories = calories * 0.25;
  const fat = fatCalories / 9;

  const carbCalories = calories - (proteinCalories + fatCalories);
  const carbs = carbCalories / 4;

  // --- Calculate health score ---
  function calculateHealthyScore({ calories, protein, fat, carbs, TDEE }: {
    calories: number, protein: number, fat: number, carbs: number, TDEE: number
  }) {
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const carbCalories = carbs * 4;

    const proteinPercent = (proteinCalories / calories) * 100;
    const fatPercent = (fatCalories / calories) * 100;
    const carbPercent = (carbCalories / calories) * 100;

    const ideal = {
      protein: [20, 30], // %
      fat: [20, 35],     // %
      carbs: [40, 60],   // %
    };

    function scoreMacro(percent: any, [min, max]: any) {
      if (percent >= min && percent <= max) return 10;
      const diff = Math.min(Math.abs(percent - min), Math.abs(percent - max));
      return Math.max(0, 10 - diff);
    }

    const proteinScore = scoreMacro(proteinPercent, ideal.protein);
    const fatScore = scoreMacro(fatPercent, ideal.fat);
    const carbScore = scoreMacro(carbPercent, ideal.carbs);

    let calorieScore = 0;
    const calRatio = calories / TDEE;
    if (calRatio >= 0.9 && calRatio <= 1.1) calorieScore = 10;
    else if ((calRatio >= 0.8 && calRatio < 0.9) || (calRatio > 1.1 && calRatio <= 1.2)) calorieScore = 7;
    else calorieScore = 4;

    const avgScore = (proteinScore + fatScore + carbScore + calorieScore) / 4;

    return Math.round(avgScore); // round to int 1-10 scale
  }

  const healthScore = calculateHealthyScore({
    calories,
    protein,
    fat,
    carbs,
    TDEE,
  });

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fat),
    healthScore,
  };
}

export type FoodTrackEntry = {
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  metricServingAmount: number;
  metricServingUnit: string;
  foodName: string;
  healthScore: number | null;
  brandName: string | null;
  type: 'scan' | 'db' | string;
};


export const nutrientsLabels: Record<string, { title: string; paragraph: string; label: string }> = {
  calories: {
    title: ' kcal',
    paragraph: 'Calories in current portion',
    label: 'Calories'
  },
  carbohydrate: {
    title: ' g',
    paragraph: 'Carbohydrates per portion',
    label: 'Carbohydrate'
  },
  fat: {
    title: ' g',
    paragraph: 'Fats per portion',
    label: 'Fat'
  },
  protein: {
    title: ' g',
    paragraph: 'Protein per portion',
    label: 'Protein'
  },
  metric_serving_amount: {
    title: '', // Unit will be added dynamically
    paragraph: 'Serving Size',
    label: 'Quantity'
  }
};