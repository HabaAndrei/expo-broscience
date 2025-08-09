import type { SizeTokens } from 'tamagui'
import { Label, Separator, Switch, XStack } from 'tamagui'

export default function SwitchWithLabel(props: {
  switcherSize: SizeTokens,
  labelSize: SizeTokens,
  labelText: string,
  onChange: (value: boolean)=>void
}) {
  return (
    <XStack alignItems="center" gap="$4">
      <Label
        paddingRight="$0"
        justifyContent="flex-end"
        size={props.labelSize}
      >
        {props.labelText}
      </Label>
      <Separator minHeight={20} vertical />
      <Switch size={props.switcherSize} onCheckedChange={(v:boolean)=>props?.onChange(v)}>
        <Switch.Thumb animation="quicker" />
      </Switch>
    </XStack>
  )
}