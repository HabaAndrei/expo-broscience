import React, { useEffect, useState } from 'react';
import { YStack, Input } from 'tamagui';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import SearchResults from '@/components/SearchFood/SearchResults';
import SelectedOption from '@/components/SearchFood/SelectedOption';
import NutritionLabel from '@/components/SearchFood/NutritionLabel';

export type FoodItem = {
  brand_name?: string | undefined | null;
  food_id: number | string,
  food_name: string,
  food_type: string,
  food_url: string,
  servings: any,
  editable?: any,
};

export default function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [selected, setSelected] = useState<FoodItem | null >(null)
  const [options, setOptions] = useState<string[]>([]);

  useEffect(()=>{
    searchFood(searchText)
  }, [searchText]);

  async function searchFood(input: string){
    input = input?.trim();
    if (!input?.length) return;
    try {
      const resultSearch = await axios.get(EnvConfig.get('serverAddress') + "/searchFood", {params: {input}});
      if (!resultSearch?.data?.is_resolved) {
        console.log("the search is not completed");
        return;
      }

      setOptions(resultSearch?.data?.data?.length ? resultSearch?.data?.data : []);
    }catch(err){
      console.log("the search is not completed", err);
    }
  }

  function selectFood(food: FoodItem){
    const serving = food?.servings?.[0];
    const {calories, carbohydrate, fat, metric_serving_amount, metric_serving_unit, protein} = serving;
    food['editable'] = {calories, carbohydrate, fat, metric_serving_amount, metric_serving_unit, protein};
    setSelected(food);
  }

  return (
    <YStack style={{ alignSelf: 'center' }}  width="100%" space="$2" mt="$4" position="relative">
      <Input
        style={{alignSelf: 'center'}}
        placeholder="Search..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text)
          setShowOptions(true)
        }}
        onFocus={() => setShowOptions(true)}
        onBlur={() => {
          setTimeout(() => setShowOptions(false), 200)
        }}
        width="90%"
        borderColor="#ccc"
        borderWidth={1}
      />

      {showOptions && options.length > 0 && (
        <SearchResults
          options={options}
          func={(option:FoodItem)=>{
            setShowOptions(false)
            selectFood(option)
          }}
        />
      )}

      {selected ? (
        <>
          <SelectedOption selected={selected} setSelected={setSelected} />
          <NutritionLabel selected={selected} />
        </>
      ) : null}

    </YStack>
  )
}
