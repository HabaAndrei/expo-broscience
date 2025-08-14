import { View, Text } from 'tamagui';
import { FoodItem } from '@/components/SearchFood/SearchBar';
import { cutDecimals, unitMapNutrients, nutrientLabels } from '@/helpers/diverse';

export default function NutritionLabel({selected}: {selected: FoodItem}){

  const {food_name, servings} = selected;
  const serving = servings[0]


  const formatValue = (key: string, value: string | number) => {
    const unit = unitMapNutrients[key] ?? ""
    return `${value}${unit ? ' ' + unit : ''}`
  }

  return (
    <View
      borderWidth={2}
      borderColor="#000"
      style={{
        minWidth: 300,
        backgroundColor: "white"
      }}
      mx="auto"
      my="$4"
    >
      {/* Header */}
      <View px="$3" py="$2">
        <Text fontSize={24} fontWeight="900" color="#000" mb="$2"> Nutrition Facts </Text>
        <Text fontSize={14} mb="$2" fontWeight="600" color="#000">Name: {food_name}</Text>

        <View flexDirection="row" style={{justifyContent: "space-between"}} mb="$2">
          <Text fontSize={14} fontWeight="600" color="#000">Serving Size</Text>
          <Text fontSize={14} fontWeight="600" color="#000">{serving?.serving_description}</Text>
        </View>

        <View flexDirection="row" style={{justifyContent:"space-between"}} mb="$2">
          <Text fontSize={14} fontWeight="600" color="#000">Metric serving amount</Text>
          <Text fontSize={14} fontWeight="600" color="#000">
            {cutDecimals(serving?.metric_serving_amount)} {serving.metric_serving_unit}
          </Text>
        </View>

        <View height={8} bg="#000" my="$2" />

        <Text fontSize={12} fontWeight="400" color="#000" mb="$1">Amount Per Serving</Text>
      </View>

      {/* Nutrients */}
      <View px="$3">
        {Object.entries(nutrientLabels).map(([key, label]) => {
          const value = serving[key]
          if (value == null || Number(value) < 0 || value === "") return null

          const isCalories = key === 'calories'
          const isIndented = ['saturated_fat', 'trans_fat', 'polyunsaturated_fat', 'monounsaturated_fat', 'fiber', 'sugar', 'added_sugars'].includes(key)
          const hasThickBorder = ['calories', 'sodium', 'carbohydrate', 'protein'].includes(key)

          return (
            <View key={key}>
              <View
                flexDirection="row"
                style={{
                  justifyContent:"space-between",
                  alignItems: "center"
                }}
                py={isCalories ? "$2" : "$1"}
                borderBottomWidth={hasThickBorder ? 4 : 1}
                borderBottomColor="#666"
              >
                <View flexDirection="row"
                  style={{
                    alignItems: "center"
                  }}
                >
                  {isIndented && <View width={20} />}
                  <Text
                    fontSize={isCalories ? 16 : 14}
                    fontWeight={isCalories ? "700" : "400"}
                    color="#000"
                  >
                    {label}
                  </Text>
                </View>

                <Text
                  fontSize={isCalories ? 28 : 14}
                  fontWeight={isCalories ? "900" : "600"}
                  color="#000"
                >
                  {isCalories ? value : formatValue(key, value)}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}