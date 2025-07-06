import React, { useEffect, useState } from 'react';
import { YStack, Input } from 'tamagui';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import SearchResults from '@/components/SearchFood/SearchResults';
import SelectedOption from '@/components/SearchFood/SelectedOption';

type FoodItem = {
  name: string;
  calories: number,
  carbs: number,
  fats: number,
  protein: number,
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
      console.log(resultSearch.data.data);

      setOptions(resultSearch?.data?.data?.length ? resultSearch?.data?.data : []);
    }catch(err){
      console.log("the search is not completed", err);
    }
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
        width="80%"
        borderColor="#ccc"
        borderWidth={1}
      />

      {showOptions && options.length > 0 && (
        <SearchResults
          options={options}
          func={(optin:FoodItem)=>{
            setShowOptions(false)
            setSelected(optin)
          }}
        />
      )}

      {selected ? (
        <SelectedOption selected={selected} setSelected={setSelected} />
      ) : null}

    </YStack>
  )
}
