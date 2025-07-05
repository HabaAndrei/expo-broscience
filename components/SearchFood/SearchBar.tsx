import React, { useEffect, useState } from 'react';
import { YStack, Text, Input, Button } from 'tamagui';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [selected, setSelected] = useState('')
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
      setOptions(resultSearch.data.data);
    }catch(err){
      console.log("the search is not completed", err);
    }
  }

  return (
    <YStack style={{ alignSelf: 'center' }} width={300} space="$2" mt="$4" position="relative">
      <Input
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
        width="100%"
        borderColor="#ccc"
        borderWidth={1}
      />

      {showOptions && options.length > 0 && (
        <YStack
          position="absolute"
          top={48}
          left={0}
          right={0}
          borderRadius={10}
          borderWidth={1}
          borderColor="#ddd"
          elevation={5}
          maxHeight={200}
          overflow="scroll"
          shadowColor="#000"
          shadowOpacity={0.1}
          shadowRadius={10}
          shadowOffset={{ width: 0, height: 4 }}
          zIndex={1000}
          backgroundColor="white"
        >
          {options.map((option, idx) => (
            <Button
              key={option}
              onPress={() => {
                setSelected(option)
                setSearchText(option)
                setShowOptions(false)
              }}
              size="$4"
              borderBottomWidth={idx === options.length - 1 ? 0 : 1}
              borderBottomColor="#eee"
              backgroundColor="transparent"
            >
              <Text fontSize={15} color="#333">
                {option}
              </Text>
            </Button>
          ))}
        </YStack>
      )}

      {selected ? (
        <Text mt="$2" fontSize={14} color="#555">
          Selected: {selected}
        </Text>
      ) : null}
    </YStack>
  )
}
