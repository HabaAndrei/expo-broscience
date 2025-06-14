
import { Card, H5, Paragraph, Button, YStack, XStack } from 'tamagui'


// PROPS:
// title => the title of card
// paragraph => the paragraph of card
// button => The name of the button
// func => the function the be executed OPTIONAL

export default function PlanCard(props: any) {
  return (
    <XStack $maxMd={{ flexDirection: 'column' }} >
      <CardDemo
        {...props}
        animation="bouncy"
        size="$4"
        width={110}
        height={180}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
      />
    </XStack>
  )
}


function CardDemo({ title, paragraph, button, func, ...rest }: any) {
  return (
    <Card
      elevate
      size="$4"
      bordered
      {...rest}
      padding="$4"
      justifyContent="space-between"
    >
      <YStack>
        <H5 marginBottom="$1">{title}</H5>
        <Paragraph>{paragraph}</Paragraph>
      </YStack>

      {func ? (
        <Button
          borderRadius="$10"
          alignSelf="center"
          size="$2"
          onPress={() => func()}
        >
          {button}
        </Button>
      ) : null}
    </Card>
  );
}
