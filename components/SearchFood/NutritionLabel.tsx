import { View, Text } from 'tamagui';
import { FoodItem } from '@/components/SearchFood/SearchBar';

export default function NutritionLabel({selected}: {selected: FoodItem}){

  const {food_name, servings} = selected;
  const serving = servings[0]

  const unitMap: Record<string, string> = {
    calories: "kcal",
    carbohydrate: "g",
    protein: "g",
    fat: "g",
    saturated_fat: "g",
    trans_fat: "g",
    polyunsaturated_fat: "g",
    monounsaturated_fat: "g",
    cholesterol: "mg",
    sodium: "mg",
    potassium: "mg",
    fiber: "g",
    sugar: "g",
    added_sugars: "g",
    vitamin_a: "µg",
    vitamin_c: "mg",
    vitamin_d: "µg",
    calcium: "mg",
    iron: "mg"
  }

  const formatValue = (key: string, value: string | number) => {
    const unit = unitMap[key] ?? ""
    return `${value}${unit ? ' ' + unit : ''}`
  }

  const nutrientLabels: Record<string, string> = {
    calories: "Calories",
    carbohydrate: "Carbohydrates",
    protein: "Protein",
    fat: "Total Fat",
    saturated_fat: "Saturated Fat",
    trans_fat: "Trans Fat",
    polyunsaturated_fat: "Polyunsaturated Fat",
    monounsaturated_fat: "Monounsaturated Fat",
    cholesterol: "Cholesterol",
    sodium: "Sodium",
    potassium: "Potassium",
    fiber: "Fiber",
    sugar: "Sugars",
    added_sugars: "Added Sugars",
    vitamin_a: "Vitamin A",
    vitamin_c: "Vitamin C",
    vitamin_d: "Vitamin D",
    calcium: "Calcium",
    iron: "Iron"
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
            {Math.trunc(Number(serving?.metric_serving_amount))} {serving.metric_serving_unit}
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