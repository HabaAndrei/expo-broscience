export type PlanInputType = {
  gender: string;
  workouts: number | string;
  height: number | string;
  weight: number | string;
  goal: string;
  age: number | string;
};

export type FoodTrackEntry = {
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  metricServingAmount: number | undefined | null | string;
  metricServingUnit: number | undefined | null | string;
  foodName: string;
  healthScore: number | null;
  brandName: string | null | undefined;
  type: 'scan' | 'db' | 'manualy' | string;
  uid?: string | null | undefined;
  createdAt?: any;
};

export type Plan = {
  calories: string | number,
  carbohydrate: string | number,
  healthScore: string | number,
  protein: string | number,
  createdAt?: any,
  updatedAt?: any
}