import { useState } from "react";
import { Input, YStack, XStack, Paragraph } from "tamagui";


export default function QueryTable(){
  const [query, setQuery] = useState({
    calories: { minValue: '', maxValue: '' },
    carbohydrate: { minValue: '', maxValue: '' },
    fat: { minValue: '', maxValue: '' },
    protein: { minValue: '', maxValue: '' }
  });

  const [searchText, setSearchText] = useState("");

  const handleQueryChange = (nutrient: string, field: string, value: string) => {
    if (isNaN(Number(value))) return;
    setQuery((prev)=>{
      return {...prev, [nutrient]: {...prev[nutrient], [field]: value}}
    })
  };

  const rows = [
    { key: "calories", label: "Calories" },
    { key: "carbohydrate", label: "Carbs" },
    { key: "fat", label: "Fat" },
    { key: "protein", label: "Protein" }
  ];

  return (
    <YStack space="$3" p="$3">
      {/* Search bar */}
      <Input
        mt="$4"
        style={{ alignSelf: "center" }}
        placeholder="Search recipe ... "
        value={searchText}
        onChangeText={setSearchText}
        width="90%"
        borderColor="#ccc"
        borderWidth={1}
      />

      {/* Compact table */}
      <YStack
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        overflow="hidden"
        marginBottom="$4"
      >
        {rows.map((row, index) => (
          <XStack
            key={row.key}
            justifyContent="space-between"
            alignItems="center"
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderBottomWidth={index !== rows.length - 1 ? 1 : 0}
            borderColor="$borderColor"
            space="$"
          >
            <Paragraph>{row.label}</Paragraph>
            <XStack space="$2">
              <Input
                size="$2"
                width={60}
                placeholder="Min"
                keyboardType="numeric"
                value={query[row.key]?.minValue?.toString() || ""}
                onChangeText={(val) =>
                  handleQueryChange(row.key, "minValue", val)
                }
              />
              <Input
                size="$2"
                width={60}
                placeholder="Max"
                keyboardType="numeric"
                value={query[row.key]?.maxValue?.toString() || ""}
                onChangeText={(val) =>
                  handleQueryChange(row.key, "maxValue", val)
                }
              />
            </XStack>
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}
