import { View, Text } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';
import { H4 } from 'tamagui';

export default function Gender(props: any){
  return (
    <View style={{alignItems: 'center'}} >
      <H4>Select your gender</H4>
      <RadioGroup
        style={{margin: 30}}
        aria-labelledby="Select your gender"
        name="form"
        value={props?.value?.pages?.Gender?.chosenIndex}
        onValueChange={(newVal)=>{
          props.handleChangeDispatch({ type: 'setGender', payload: newVal })
        }}
      >
        <YStack
          width={300}
          style={{alignItems: "center"}}
          space="$2"
        >
          {props.value.pages.Gender.values.map((value: any, index: any)=>{
            return (
              <RadioGroupItemWithLabel
                key={index}
                size="$5"
                value={index}
                label={value}
                width={100}
              />
            )
          })}
        </YStack>
      </RadioGroup>
    </View>
  )
}
