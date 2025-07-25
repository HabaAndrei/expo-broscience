import { Button, Text, YStack } from "tamagui"

export default function SearchResults(props: any) {
  return (
    <YStack
      width="80%"
      position="absolute"
      top={48}
      borderRadius={10}
      borderWidth={1}
      borderColor="#ddd"
      elevation={5}
      maxHeight={200}
      overflow="scroll"
      backgroundColor="white"
      shadowColor="#000"
      shadowOpacity={0.1}
      shadowRadius={10}
      shadowOffset={{ width: 0, height: 4 }}
      zIndex={1000}
      alignSelf="center"
    >
      {props.options.map((option: any, idx: number) => (
        <Button
          key={idx}
          onPress={() => props.func(option)}
          size="$4"
          justifyContent="center"
          alignItems="center"
          backgroundColor="transparent"
          borderBottomWidth={idx === props.options.length - 1 ? 0 : 1}
          borderBottomColor="#eee"
          px="$3"
          py="$2"
        >
          <YStack alignItems="center">
            <Text fontSize={15} color="#333" fontWeight="600">
              {option.food_name}
            </Text>
            {option.brand_name && (
              <Text fontSize={13} color="#888">
                {option.brand_name}
              </Text>
            )}
          </YStack>
        </Button>
      ))}
    </YStack>
  )
}