import { useEffect, useRef, useState } from "react";
import { View, XStack } from "tamagui";
import QueryTable from '@/components/Recipes/QueryTable';
import { Recipe } from '@/types/food';
import Recipes from '@/components/Recipes/Recipes';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import { ArrowRightCircle, ArrowLeftCircle } from '@tamagui/lucide-icons'
import { Pressable } from "react-native";

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
  const pagination = useRef({ limit: 10, offset: 0 });

  useEffect(() => {
    pagination.current.offset = 0;
    getRecipes();
  }, [filter, searchText]);

  async function getRecipes() {
    try {
      const resultSearch = await axios.get(
        EnvConfig.get('serverAddress') + "/search-recipe",
        {
          params: {
            input: searchText,
            filter: JSON.stringify(filter),
            pagination: JSON.stringify(pagination.current)
          }
        }
      );
      if (!resultSearch?.data?.is_resolved) {
        console.log("the search is not completed");
        return;
      }
      const recipes = resultSearch?.data?.data;
      setRecipes(recipes ?? []);
    } catch (err) {
      console.log("the search is not completed", err);
    }
  }

  const isDisabledLeft = pagination.current.offset < 1;
  const isDisabledRight = recipes?.length < pagination.current.limit;

  function changePage(direction: 'left' | 'right') {
    if (direction == 'left') {
      const newVal = pagination.current.offset - pagination.current.limit;
      if (newVal < 0) {
        pagination.current.offset = 0;
        return;
      }
      pagination.current.offset = newVal;
    } else if (direction == 'right') {
      if (recipes?.length < pagination.current.limit) return;
      pagination.current.offset =
        pagination.current.offset + pagination.current.limit;
    }
    getRecipes();
  }

  return (
    <View>
      <QueryTable
        setFilter={setFilter}
        filter={filter}
        setSearchText={setSearchText}
        searchText={searchText}
      />

      {recipes.length ? <Recipes recipes={recipes} /> : null}

      {/* Pagination Arrows */}
      <XStack  style={{justifyContent: "center", alignItems: "center"}} gap="$4" mt="$6">
        <Pressable
          disabled={isDisabledLeft}
          onPress={() => changePage('left')}
        >
          <ArrowLeftCircle
            size={40}
            color={isDisabledLeft ? "#ccc" : "#0f0f0f"}
            opacity={isDisabledLeft ? 0.5 : 1}
          />
        </Pressable>

        <Pressable
          disabled={isDisabledRight}
          onPress={() => changePage('right')}
        >
          <ArrowRightCircle
            size={40}
            color={isDisabledRight ? "#ccc" : "#0f0f0f"}
            opacity={isDisabledRight ? 0.5 : 1}
          />
        </Pressable>
      </XStack>
    </View>
  );
}
