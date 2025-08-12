import { Card, Text, XStack, YStack } from "tamagui";
import { nutrientsIcons } from '@/helpers/diverse';
import { FoodTrackEntry } from '@/types/food';

export default function FoodCard({ food }: {food: FoodTrackEntry}) {

  const minutes = food?.createdAt?.toDate()?.getMinutes();
  const hours = food?.createdAt?.toDate()?.getHours();

  return (
    <Card
      elevate
      bordered
      p="$4"
      m="$2"
      borderRadius="$6"
      backgroundColor="$background"
    >
      <YStack space="$2">

        <XStack justifyContent="space-between" alignItems="center">
          <YStack maxWidth={250}>
            <Text fontWeight="700" fontSize="$4" flexWrap="wrap">
              {food?.foodName ?? ""}
            </Text>
            {food?.brandName && (
              <Text fontSize="$1" color="$color10" flexWrap="wrap">
                {food?.brandName}
              </Text>
            )}
          </YStack>
          <YStack>
            <Text
              paddingHorizontal="$2"
              paddingVertical="$1"
              borderRadius="$4"
              fontSize="$1"
              color="$color10"
            >
              {minutes >= 0 && hours >= 0  ? `${hours == 0 ? '00' : hours }:${minutes == 0 ? '00' : minutes}`: ''}
            </Text>
          </YStack>
        </XStack>

        <XStack alignItems="center" space="$2">
          {nutrientsIcons?.calories}
          <Text fontSize="$4" fontWeight="600">
            {food?.calories} calories
          </Text>
        </XStack>

        <XStack justifyContent="flex-start" space="$4" alignItems="center">
          <XStack space="$1" alignItems="center">
            {nutrientsIcons?.protein}
            <Text fontSize="$2" color="$color10">
              {food?.protein}g
            </Text>
          </XStack>
          <XStack space="$1" alignItems="center">
            {nutrientsIcons.carbohydrate}
            <Text fontSize="$2" color="$color10">
              {food?.carbohydrate}g
            </Text>
          </XStack>
          <XStack space="$1" alignItems="center">
            {nutrientsIcons.fat}
            <Text fontSize="$2" color="$color10">
              {food?.fat}g
            </Text>
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
}
