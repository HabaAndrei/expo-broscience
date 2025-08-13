import { View } from "tamagui";
import { Recipe } from "@/types/food";
import RecipeCard from '@/components/Cards/RecipeCard';

export default function Recipes({ recipes }: { recipes: Recipe[] }) {
  return (
    <View>
      {recipes.map((recipe, index) => {
        const {
          cooking_time_min,
          grams_per_portion,
          recipe_name,
          recipe_images,
        } = recipe ?? {};
        const image = recipe_images?.recipe_image?.[0] ?? "";
        const { calories, carbohydrate, fat, protein } =
          recipe?.serving_sizes?.serving ?? {};

        return (
          <RecipeCard
            key={index}
            cooking_time_min={cooking_time_min}
            grams_per_portion={grams_per_portion}
            recipe_name={recipe_name}
            image={image}
            calories={calories}
            carbohydrate={carbohydrate}
            fat={fat}
            protein={protein}
          />
        );
      })}
    </View>
  );
}
