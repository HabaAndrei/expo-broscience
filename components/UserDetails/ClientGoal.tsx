import { View } from 'react-native';
import { RadioGroup, YStack } from 'tamagui'
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';
import { H4 } from 'tamagui';


export default function ClientGoal(props: {
  chosenIndex: string | undefined | number,
  onChange: (newVal: number)=>void,
  values: string[] | number[],
  title?: string | undefined
}){
  return (
    <View style={{alignItems: 'center'}} >
      {props.title ? <H4>{props.title}</H4> : null}
      <RadioGroup
        style={{margin: 30}}
        aria-labelledby="Select your goal"
        name="form"
        value={props?.chosenIndex}
        onValueChange={(newVal: number)=>{
          props.onChange(newVal)
        }}
      >
        <YStack
          width={300}
          style={{alignItems: "center"}}
          space="$2"
        >
          {props?.values.map((value: any, index: any)=>{
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
