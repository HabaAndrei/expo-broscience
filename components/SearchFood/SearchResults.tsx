import { Button, Text, YStack } from "tamagui"

export default function SearchResults(props:any){
  return (
    <YStack
      width='80%'
      position="absolute"
      top={48}
      borderRadius={10}
      borderWidth={1}
      borderColor="#ddd"
      elevation={5}
      maxHeight={200}
      overflow="scroll"
      shadowColor="#000"
      shadowOpacity={0.1}
      shadowRadius={10}
      shadowOffset={{ width: 0, height: 4 }}
      zIndex={1000}
      backgroundColor="white"
      style={{ alignSelf: 'center' }}
    >
      {props.options.map((option: any, idx: number) => (
        <Button
          key={option?.name}
          onPress={()=>props.func(option)}
          size="$4"
          borderBottomWidth={idx === props.options.length - 1 ? 0 : 1}
          borderBottomColor="#eee"
          backgroundColor="transparent"
        >
          <Text fontSize={15} color="#333">
            {option.name}
          </Text>
        </Button>
      ))}
    </YStack>
  )
}