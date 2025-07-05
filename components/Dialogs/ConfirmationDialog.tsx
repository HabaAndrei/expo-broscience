import { AlertDialog, Button, XStack, YStack } from 'tamagui'

export default function ConfirmationDialog(props: any) {
  return (
    <>
      <AlertDialog open={props.isOpen} onOpenChange={props.setIsOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack gap="$4">
            <AlertDialog.Title>Confirmation</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to proceed with this action?
            </AlertDialog.Description>

              <XStack gap="$3" style={{justifyContent:"flex-end"}}>
                <AlertDialog.Cancel asChild>
                  <Button onPress={()=>{props.promiseDecision.resolve(false)}}>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button onPress={()=>{props.promiseDecision.resolve(true)}} theme="accent">Accept</Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  )
}