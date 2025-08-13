import { useState } from "react";
import { View } from "tamagui";
import QueryTable from '@/components/Recipes/QueryTable';
import { Recipe } from '@/types/food';
import Recipes from '@/components/Recipes/Recipes';

export default function Main() {

  const [recipes, setRecipes] = useState<Recipe[] | []>([]);

  return (
    <View style={{paddingBottom: 100}} >
      <QueryTable setRecipes={setRecipes} />
      {recipes.length ?
        <Recipes recipes={recipes} /> : null
      }
    </View>
  );
}
