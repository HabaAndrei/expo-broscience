import { View, Text } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';

export default function Gender(props: any){
  return (
    <View>
      <Text>Gender</Text>
      <RadioGroup
        aria-labelledby="Select one item"
        name="form"
        value={props?.value?.pages?.Gender?.chosenIndex}
        onValueChange={(newVal)=>{
          props.dispatch({ type: 'setGender', payload: newVal })
        }}
      >
        <YStack
          width={300}
          alignItems="center"
          space="$2"
        >
          {props.value.pages.Gender.values.map((value: any, index: any)=>{
            return (
              <RadioGroupItemWithLabel key={index} size="$5" value={index} label={value} />
            )
          })}
        </YStack>
      </RadioGroup>
    </View>
  )
}
