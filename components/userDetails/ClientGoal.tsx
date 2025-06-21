import { View, Text } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';
import { H4 } from 'tamagui';

export default function ClientGoal(props: any){
  return (
    <View style={{alignItems: 'center'}} >
      <H4>Select your goal</H4>
      <RadioGroup
        style={{margin: 30}}
        aria-labelledby="Select your goal"
        name="form"
        value={props?.value?.pages?.ClientGoal?.chosenIndex}
        onValueChange={(newVal)=>{
          props.handleChangeDispatch({ type: 'setGoal', payload: newVal })
        }}
      >
        <YStack
          width={300}
          alignItems="center"
          space="$2"
        >
          {props.value.pages.ClientGoal.values.map((value: any, index: any)=>{
            return (
              <RadioGroupItemWithLabel
                key={index}
                size="$5"
                value={index}
                label={value}
                width={150}
              />
            )
          })}
        </YStack>
      </RadioGroup>
    </View>
  )
}
