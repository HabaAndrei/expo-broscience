import { YStack, H2, Paragraph, Image } from 'tamagui'

export default function ThanksMessage() {
  return (
    <YStack
      flex={1}
      style={{justifyContent: "center", alignItems: "center"}}
      p="$6"
      space="$4"
    >
      <Image
        source={require('@/assets/images/icon.png')}
        width={80}
        height={80}
        borderRadius="$6"
        mb="$3"
      />

      <H2 fontWeight="700" color="$color12" style={{alignSelf: "center"}}>
        Thank You for Choosing Bro Science
      </H2>

      <Paragraph fontWeight="700" color="$color12" style={{alignSelf: "center"}}>
        We’re excited to support your journey toward healthier eating and better living.
      </Paragraph>

      <Paragraph fontWeight="700" color="$color12" style={{alignSelf: "center"}}>
        Your privacy is our top priority. We keep your data safe and secure, and we are
        committed to delivering the highest quality service to help you reach your goals.
      </Paragraph>

    </YStack>
  )
}
