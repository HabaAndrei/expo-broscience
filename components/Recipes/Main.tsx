import { useEffect, useRef, useState } from "react";
import { View } from "tamagui";
import QueryTable from '@/components/Recipes/QueryTable';
import { Recipe } from '@/types/food';
import Recipes from '@/components/Recipes/Recipes';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import { ArrowRightCircle, ArrowLeftCircle } from '@tamagui/lucide-icons'

type NutrientFilter = {
  minValue: string;
  maxValue: string;
};

export type Filter = {
  calories: NutrientFilter;
  carbohydrate: NutrientFilter;
  fat: NutrientFilter;
  protein: NutrientFilter;
};


export default function Main() {

  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  const [filter, setFilter] = useState<Filter>({
    calories: { minValue: '', maxValue: '' },
    carbohydrate: { minValue: '', maxValue: '' },
    fat: { minValue: '', maxValue: '' },
    protein: { minValue: '', maxValue: '' }
  });
  const [searchText, setSearchText] = useState("");
  const pagination = useRef({limit: 10, offset: 0});

  useEffect(()=>{
    getRecipes();
  }, [filter, searchText]);

  async function getRecipes(){
    try {
      const resultSearch = await axios.get(EnvConfig.get('serverAddress') + "/search-recipe", {
        params: {input: searchText, filter: JSON.stringify(filter), pagination: JSON.stringify(pagination.current)}
      });
      if (!resultSearch?.data?.is_resolved) {
        console.log("the search is not completed");
        return;
      }
      const recipes = resultSearch?.data?.data;
      if (recipes?.length) setRecipes(recipes)
    }catch(err){
      console.log("the search is not completed", err);
    }
  }

  return (
    <View style={{paddingBottom: 100}} >
      <QueryTable
        setFilter={setFilter}
        filter={filter}
        setSearchText={setSearchText}
        searchText={searchText}
      />
      {recipes.length ?
        <Recipes recipes={recipes} /> : null
      }
    </View>
  );
}
