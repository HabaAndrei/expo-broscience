import { Text, XStack, YStack, Circle } from "tamagui";
import { ArrowLeftCircle, ArrowRightCircle } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { Pressable } from "react-native";

export default function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = [...Array(7)].map((_, index) => addDays(startOfCurrentWeek, index));

  function prev() {
    setCurrentWeek((prev) => subWeeks(prev, 1));
  }

  function next() {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  }

  return (
    <YStack  style={{alignSelf: 'center', alignItems: "center", justifyContent: "center"}} width="100%" padding="$4">

      <XStack
        style={{alignSelf: 'center', alignItems: "center", justifyContent: "center"}}
         space="$1" width="100%">

        <Pressable
          onPress={prev}
        >
          <ArrowLeftCircle
            size="$3"
            color="$color"
          />
        </Pressable>

        <XStack space="$1" justifyContent="center" alignItems="center" flexWrap="no-wrap">
          {days.map((day, index) => {
            const isSelected = isSameDay(day, selectedDay);
            return (
              <YStack key={index} alignItems="center" space="$1">
                <Text fontSize="$1" fontWeight="600">
                  {format(day, 'EEE')}
                </Text>
                <Circle
                  size="$3"
                  backgroundColor={isSelected ? "$color6" : "$gray4"}
                  pressStyle={{ backgroundColor: "$color7" }}
                  onPress={() => setSelectedDay(day)}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    color={isSelected ? "$color12" : "$color"}
                    fontWeight="700"
                  >
                    {format(day, 'd')}
                  </Text>
                </Circle>
              </YStack>
            );
          })}
        </XStack>

      <Pressable
        onPress={next}
      >
        <ArrowRightCircle
          size="$3"
          color="$color"
        />
      </Pressable>
      </XStack>
    </YStack>
  );
}
