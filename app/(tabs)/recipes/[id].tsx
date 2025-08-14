import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import Recipe from '@/components/Recipes/Recipe';
import { Recipe as RecipeType } from '@/types/food';


export default function RecipeWithId() {
  // This pulls the `id` from the route, e.g., /recipes/123
  const { id } = useLocalSearchParams();

  const [recipe, setRecipe] = useState<null | RecipeType>(null);

  useEffect(()=>{
    getRecipeById();
  }, []);


  async function getRecipeById(){
    if (!id) return;
    try {
      const resultSearch = await axios.get(EnvConfig.get('serverAddress') + `/search-recipe/${id}`);
      if (!resultSearch?.data?.is_resolved) {
        console.log("the search is not completed");
        return;
      }
      const recipe = resultSearch?.data?.data;
      console.log(recipe)
      if (recipe) setRecipe(recipe)
    }catch(err){
      console.log("the search is not completed", err);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Recipe`,
        }}
      />

      <ScrollView>
        {recipe?
          <Recipe recipe={recipe} /> : null
        }
      </ScrollView>
    </>
  );
}