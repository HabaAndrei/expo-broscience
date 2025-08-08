import { Text, YStack } from "tamagui"
import { Pressable } from "react-native"

export default function SearchResults(props: any) {
  return (
    <YStack>
      {props.options.map((option: any, idx: number) => (
        <Pressable
          key={idx}
          onPress={() => props.func(option)}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderBottomWidth: idx === props.options.length - 1 ? 0 : 1,
            borderBottomColor: "#eee",
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 8,
            flexShrink: 0,
          }}
        >
          <YStack alignItems="center" width="100%" paddingHorizontal={10}>
            <Text
              fontSize={13}
              color="#333"
              fontWeight="600"
              textAlign="center"
              flexShrink={1}
            >
              {option.food_name}
            </Text>
            {option.brand_name && (
              <Text
                fontSize={11}
                color="#888"
                textAlign="center"
                flexShrink={1}
              >
                {option.brand_name}
              </Text>
            )}
          </YStack>
        </Pressable>
      ))}
    </YStack>
  )
}