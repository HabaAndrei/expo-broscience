import { Label, RadioGroup, XStack } from 'tamagui';


export default function RadioGroupItemWithLabel(props: {
  size: string
  value: string
  label: string
  width: number
}) {
  const id = `radiogroup-${props.value}`
  return (
    <XStack width={props.width ? props.width : 100} alignItems="center" space="$4">
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  )
}