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

export type Serving = {
  calcium: string;
  calories: string;
  carbohydrate: string;
  cholesterol: string;
  fat: string;
  fiber: string;
  iron: string;
  monounsaturated_fat: string;
  polyunsaturated_fat: string;
  potassium: string;
  protein: string;
  saturated_fat: string;
  serving_size: string;
  sodium: string;
  sugar: string;
  trans_fat: string;
  vitamin_a: string;
  vitamin_c: string;
  metric_serving_amount?: any,
  metric_serving_unit?: any
  serving_description?: any
};


export type Recipe = {
  cooking_time_min?: any;
  directions: {
    direction: any[];
  };
  grams_per_portion: string;
  ingredients: {
    ingredient: any[];
  };
  number_of_servings: string;
  preparation_time_min?: string;
  rating: string;
  recipe_categories: {
    recipe_category: any[];
  };
  recipe_description: string;
  recipe_id: string;
  recipe_images: {
    recipe_image: string[];
  };
  recipe_name: string;
  recipe_types: {
    recipe_type: string[];
  };
  recipe_url: string;
  serving_sizes: {
    serving: Serving;
  };
}
