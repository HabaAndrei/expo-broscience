import { Text, Card, YStack, Image, XStack, Button } from "tamagui";
import { ArrowRight } from "@tamagui/lucide-icons";
import { nutrientsIcons } from "@/helpers/diverse";
import { cutDecimals } from '@/helpers/diverse';
import { router } from 'expo-router';

type RecipeCardProps = {
  cooking_time_min?: string;
  grams_per_portion?: string;
  recipe_name: string;
  image?: string;
  calories?: string;
  carbohydrate?: string;
  fat?: string;
  protein?: string;
  recipe_id: string
};

export default function RecipeCard({
  cooking_time_min,
  grams_per_portion,
  recipe_name,
  image,
  calories,
  carbohydrate,
  fat,
  protein,
  recipe_id
}: RecipeCardProps) {
  return (
    <Card
      elevate
      bordered
      p="$4"
      m="$2"
      borderRadius="$6"
      backgroundColor="$background"
    >
      <YStack space="$3">
        {/* Recipe name + cooking time */}
        <XStack justifyContent="space-between" alignItems="center">
          <YStack maxWidth={250}>
            <Text fontWeight="700" fontSize="$4" flexWrap="wrap">
              {recipe_name ?? ""}
            </Text>
            <Text fontSize="$1" color="$color10" flexWrap="wrap">
              {grams_per_portion
                ? `${cutDecimals(grams_per_portion)} g / portion`
                : ""}
            </Text>
          </YStack>

          {cooking_time_min && (
            <YStack>
              <Text
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius="$4"
                fontSize="$1"
                color="$color10"
              >
                {`${cooking_time_min} min`}
              </Text>
            </YStack>
          )}
        </XStack>

        {/* Image */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 150,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        )}

        {/* Calories */}
        {calories && (
          <XStack alignItems="center" space="$2">
            {nutrientsIcons?.calories}
            <Text fontSize="$4" fontWeight="600">
              {cutDecimals(calories)} calories
            </Text>
          </XStack>
        )}

        {/* Macronutrients */}
        <XStack
          justifyContent="flex-start"
          space="$4"
          alignItems="center"
        >
          {protein && (
            <XStack space="$1" alignItems="center">
              {nutrientsIcons?.protein}
              <Text fontSize="$2" color="$color10">
                {cutDecimals(protein)}g
              </Text>
            </XStack>
          )}
          {carbohydrate && (
            <XStack space="$1" alignItems="center">
              {nutrientsIcons?.carbohydrate}
              <Text fontSize="$2" color="$color10">
                {cutDecimals(carbohydrate)}g
              </Text>
            </XStack>
          )}
          {fat && (
            <XStack space="$1" alignItems="center">
              {nutrientsIcons?.fat}
              <Text fontSize="$2" color="$color10">
                {cutDecimals(fat)}g
              </Text>
            </XStack>
          )}
        </XStack>

        {/* Action Button */}
        <XStack justifyContent="flex-end">
          <Button
            size="$3"
            theme="blue"
            iconAfter={ArrowRight}
            onPress={() =>
              router.navigate({
                pathname: '/recipes/[id]',
                params: { id: recipe_id }
              })
            }
          >
            View
          </Button>
        </XStack>
      </YStack>
    </Card>
  )
}