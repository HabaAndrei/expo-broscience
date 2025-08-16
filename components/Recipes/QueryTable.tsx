import { Input, YStack, XStack, Paragraph } from "tamagui";
import { Filter } from '@/components/Recipes/Main';

export default function QueryTable(
  { setFilter, filter, setSearchText, searchText }:
  {
    setFilter: React.Dispatch<React.SetStateAction<Filter>>,
    filter: Filter,
    setSearchText: React.Dispatch<React.SetStateAction<string>>,
    searchText: string
  }){

  const handleQueryChange = (nutrient: string, field: string, value: string) => {
    if (isNaN(Number(value))) return;
    setFilter((prev)=>{
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
                value={filter[row.key]?.minValue?.toString() || ""}
                onChangeText={(val) =>
                  handleQueryChange(row.key, "minValue", val)
                }
              />
              <Input
                size="$2"
                width={60}
                placeholder="Max"
                keyboardType="numeric"
                value={filter[row.key]?.maxValue?.toString() || ""}
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
