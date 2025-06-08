import { View, Text } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';

export default function Workouts(props: any){
  return (
    <View>
      <Text>Workouts</Text>
      <RadioGroup aria-labelledby="Select one item for workout" name="form"
        onValueChange={(newVal)=>{
          props.dispatch({ type: 'setWorkouts', payload: newVal })
        }}
      >
        <YStack width={300} alignItems="center" space="$2">
          {props.value.pages.Workouts.values.map((value: any, index: any)=>{
            return (
              <RadioGroupItemWithLabel key={index} size="$5" value={index} label={value.short + ' ' + `(${value.long})`} />
            )
          })}
        </YStack>
      </RadioGroup>
    </View>
  )
}