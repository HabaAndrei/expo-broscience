
import { Card, H5, Paragraph, Button, YStack, XStack } from 'tamagui'
import EditDialog from '@/components/Dialogs/EditDialog';


// PROPS:
// title => the title of card
// paragraph => the paragraph of card
// button => The name of the button
// func => the function the be executed OPTIONAL
// edit => false / object with details for edit dialog

export default function PlanCard(props: any) {
  return (
    <XStack $maxMd={{ flexDirection: 'column' }} >
      <CardDemo
        {...props}
        animation="bouncy"
        size="$4"
        width={110}
        height={190}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
      />
    </XStack>
  )
}


function CardDemo({ title, paragraph, button, func, edit, ...rest }: any) {
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

      { edit? (
        <EditDialog
          inputValue={edit.inputValue}
          func={edit.func}
          title={edit.title}
          description={edit.description}
          label={edit.label}
          buttonComponent={edit.buttonComponent}
        />
      ) : func && !edit ?
        <Button
          borderRadius="$10"
          alignSelf="center"
          size="$2"
          onPress={() => func()}
        >
          {button}
        </Button>
      : null}
    </Card>
  );
}
