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

export type Recipe = {
  directions: {
    direction: string[];
  };
  grams_per_portion: string;
  ingredients: {
    ingredient: string[];
  };
  number_of_servings: string;
  rating: string;
  recipe_categories: {
    recipe_category: string[];
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
    serving: Record<string, any>;
  };
}
