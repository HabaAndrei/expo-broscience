import { X } from '@tamagui/lucide-icons'
import { Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, Unspaced, View, XStack } from 'tamagui'
import { useState } from 'react';


// PROPS:

// inputValue => the default value to display in the input field
// func => a function that receives the new input value as a parameter
// title => the title of the dialog
// description => the description text shown in the dialog
// label => the label for the input field in the dialog
// buttonComponent => the button component that opens the dialog, e.g.:
  // <Button
  //   borderRadius="$10"
  //   alignSelf="center"
  //   size="$2"
  // >
  //   Edit
  // </Button>



export default function EditDialog(props: any) {
  return (
    <View gap="$4" justifyContent="center" alignItems="center">
      <DialogInstance {...props} />
    </View>
  )
}

function DialogInstance(props: any) {

  const [input, setInput] = useState(props.inputValue);

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        {props.buttonComponent}
      </Dialog.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadow6"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          backgroundColor="$shadow6"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          w={400}
          elevate
          borderRadius="$6"
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: 20, opacity: 0 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>{props.title}</Dialog.Title>
          <Dialog.Description>
            {props.description}
          </Dialog.Description>

          <Fieldset gap="$4" horizontal>
            <Label width={64} htmlFor="name">
              {props.label}
            </Label>
            <Input flex={1} id="name" defaultValue={input}
              onChangeText={(newVal: string)=>setInput(newVal)}
            />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">

            <Dialog.Close displayWhenAdapted asChild>
              <Button
                onPress={()=>{props.func(input)}}
                theme="accent" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}