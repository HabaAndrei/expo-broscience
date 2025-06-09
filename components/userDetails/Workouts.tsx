import { View, Text } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';
import { H4 } from 'tamagui';

export default function Workouts(props: any){
  return (
    <View style={{alignItems: 'center'}} >
      <H4>Weekly workout frequency</H4>
      <RadioGroup
        style={{margin: 30}}
        aria-labelledby="Select one item for workout"
        name="form"
        value={props?.value?.pages?.Workouts?.chosenIndex}
        onValueChange={(newVal)=>{
          props.dispatch({ type: 'setWorkouts', payload: newVal })
        }}
      >
        <YStack
          width={300}
          alignItems="center"
          space="$2"
        >
          {props?.value?.pages?.Workouts?.values?.map((value: any, index: any)=>{
            return (
              <RadioGroupItemWithLabel
                key={index}
                size="$5"
                value={index}
                label={value.short + ' ' + `(${value.long})`}
                width={280}
              />
            )
          })}
        </YStack>
      </RadioGroup>
    </View>
  )
}