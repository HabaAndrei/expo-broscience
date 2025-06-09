import { View, Text } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';

export default function ClientGoal(props: any){
  return (
    <View>
      <Text>ClientGoal</Text>
      <RadioGroup
        aria-labelledby="Select your goal"
        name="form"
        value={props?.value?.pages?.ClientGoal?.chosenIndex}
        onValueChange={(newVal)=>{
          props.dispatch({ type: 'setGoal', payload: newVal })
        }}
      >
        <YStack
          width={300}
          alignItems="center"
          space="$2"
        >
          {props.value.pages.ClientGoal.values.map((value: any, index: any)=>{
            return (
              <RadioGroupItemWithLabel key={index} size="$5" value={index} label={value} />
            )
          })}
        </YStack>
      </RadioGroup>
    </View>
  )
}
