import { View, Text, Image, ScrollView } from 'tamagui';
import { Recipe as RecipeType } from '@/types/food';
import RecipeServingLabel from '@/components/Recipes/RecipeServingLabel';

export default function Recipe({ recipe }: { recipe: RecipeType }) {

  const {
    cooking_time_min,
    directions,
    grams_per_portion,
    ingredients,
    number_of_servings,
    preparation_time_min,
    rating,
    recipe_description,
    recipe_images,
    recipe_name,
    serving_sizes
  } = recipe ?? {};

  const ingredientsList: Record<string, string>[] = ingredients?.ingredient ?? [];
  const directionsList = directions?.direction ?? [];
  const { serving } = serving_sizes ?? {};
  const image = recipe_images?.recipe_image?.[0];

  return (
    <View
      backgroundColor="white"
      p="$4"
      pb="$11"
      borderRadius={12}
      shadowColor="#000"
      shadowOpacity={0.1}
      shadowRadius={6}
      shadowOffset={{ width: 0, height: 2 }}
      overflow="hidden"
    >
      {/* Recipe Image */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 200
          }}
          resizeMode="cover"
        />
      )}

      {/* Recipe Info */}
      <View padding={16}>
        {recipe_name && (
          <Text fontSize={22} fontWeight="900" mb={4} color="#333">
            {recipe_name}
          </Text>
        )}

        {recipe_description && (
          <Text fontSize={14} color="#555" mb={12}>
            {recipe_description}
          </Text>
        )}

        <View mb={12}>
          {cooking_time_min && (
            <Text fontSize={14} color="#444">⏱ Cooking Time: {cooking_time_min} min</Text>
          )}
          {preparation_time_min && (
            <Text fontSize={14} color="#444">📝 Prep Time: {preparation_time_min} min</Text>
          )}
          {number_of_servings && (
            <Text fontSize={14} color="#444">🍽 Servings: {number_of_servings}</Text>
          )}
          {rating && (
            <Text fontSize={14} color="#444">⭐ Rating: {rating}</Text>
          )}
        </View>

        {/* Ingredients */}
        {ingredientsList.length > 0 && (
          <View mb={16}>
            <Text fontSize={18} fontWeight="700" mb={8} color="#222">
              Ingredients
            </Text>
            {ingredientsList.map((ingredient, index) => (
              <View key={index} mb={6}>
                <Text fontSize={14} fontWeight="600" color="#333">
                  {ingredient?.food_name}
                </Text>
                <Text fontSize={13} color="#555">
                  {ingredient?.ingredient_description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Directions */}
        {directionsList.length > 0 && (
          <View mb={16}>
            <Text fontSize={18} fontWeight="700" mb={8} color="#222">
              Directions
            </Text>
            {directionsList.map((direction, index) => (
              <Text key={index} fontSize={14} color="#555" mb={4}>
                {index + 1}. {direction?.direction_description}
              </Text>
            ))}
          </View>
        )}

        {/* Nutrition Label */}
        <RecipeServingLabel serving={serving} grams_per_portion={grams_per_portion} />
      </View>
    </View>
  );
}