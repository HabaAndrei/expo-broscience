import { YStack, H1, Paragraph, Button, Image, Spacer } from 'tamagui'

export default function Welcome(props: any) {
  return (
    <YStack
      flex={1}
      style={{alignItems: "center", justifyContent: "center"}}
      p="$6"
      space="$4"
    >

      <Image
        source={require('@/assets/images/icon.png')}
        width={96}
        height={96}
        borderRadius="$6"
        mb="$3"
      />

      <H1 fontWeight="700" color="$color12" >
        Welcome
      </H1>

      <Paragraph size="$5" color="$color10" width={280}>
        If you already have an account, please log in below.
      </Paragraph>

      <Spacer size="$6" />

      <Button
        size="$5"
        onPress={() =>
          props.handleChangeDispatch({
            type: 'setCurrentPage',
            payload: 'AuthForm',
          })
        }
      >
        Login
      </Button>
    </YStack>
  )
}