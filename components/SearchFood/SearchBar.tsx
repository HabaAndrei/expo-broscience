import React, { useEffect, useState } from 'react';
import { YStack, Input, ScrollView, View } from 'tamagui';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import SearchResults from '@/components/SearchFood/SearchResults';
import SelectedOption from '@/components/SearchFood/SelectedOption';
import NutritionLabel from '@/components/SearchFood/NutritionLabel';
import { Serving } from '@/types/food';

export type FoodItem = {
  brand_name?: string | undefined | null;
  food_id: number | string,
  food_name: string,
  food_type: string,
  food_url: string,
  servings: Serving[],
  editable?: any,
};

export default function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [selected, setSelected] = useState<FoodItem | null >(null)
  const [options, setOptions] = useState<string[]>([]);

  useEffect(()=>{
    if (!searchText?.trim()?.length) setShowOptions(false);
    searchFood(searchText)
  }, [searchText]);

  async function searchFood(input: string){
    input = input?.trim();
    if (!input?.length) return;
    try {
      const resultSearch = await axios.get(EnvConfig.get('serverAddress') + "/search-food", {params: {input}});
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
    <YStack
      style={{ alignSelf: 'center', padding: 16 }}
      width="100%" space="$2" mt="$4" position="relative" mb="$10"
    >
      <Input
        style={{alignSelf: 'center'}}
        placeholder="Search food ..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text)
          setShowOptions(true)
        }}
        onFocus={() => {
          if (searchText?.trim()?.length) {
            setShowOptions(true)
          }
        }}
        onBlur={() => {
          setTimeout(() => setShowOptions(false), 200)
        }}
        width="90%"
        borderColor="#ccc"
        borderWidth={1}
      />

      {showOptions && options.length > 0 && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1000,
            maxHeight: 250,
            alignSelf: "center",
            top: 63,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            width: "90%",
            borderRadius: 10,
            borderWidth: 0.1,
          }}
        >
          <ScrollView style={{maxHeight: 300}}>
            <SearchResults
              options={options}
              func={(option:FoodItem)=>{
                setShowOptions(false)
                selectFood(option)
              }}
            />
          </ScrollView>

        </View>
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
