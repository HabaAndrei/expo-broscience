import { View, Text } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';

export default function Gender(props){
  return (
    <View>
      <Text>Gender</Text>
      <RadioGroup aria-labelledby="Select one item" name="form"
        onValueChange={(newVal)=>{
          props.dispatch({ type: 'setGender', payload: newVal })
        }}
      >
        <YStack width={300} alignItems="center" space="$2">
          {props.value.pages.Gender.values.map((value, index)=>{
            return (
              <RadioGroupItemWithLabel key={index} size="$5" value={index} label={value} />
            )
          })}
        </YStack>
      </RadioGroup>
    </View>
  )
}
