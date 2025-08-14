import { View, Text } from 'tamagui';
import { Recipe as RecipeType } from '@/types/food';
import RecipeServingLabel from '@/components/Recipes/RecipeServingLabel';

export default function Recipe({recipe}:{recipe: RecipeType }){

  const { cooking_time_min, directions, grams_per_portion, ingredients,
    number_of_servings, preparation_time_min, rating, recipe_description, recipe_images,
    recipe_name, serving_sizes
  } = recipe ?? {};

  const { ingredient } = ingredients ?? {}; // ingredient is an array
  const { direction } = directions ?? {}; // direction is an array
  const { serving } = serving_sizes ?? {}


  return (
    <View>
      <RecipeServingLabel serving={serving} grams_per_portion={grams_per_portion} />
    </View>
  )
}