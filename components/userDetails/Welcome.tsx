import { View, Text } from 'react-native';
import { Button } from 'tamagui';

export default function Welcome(props: any){
  return (
    <View>
      <Text>Welcome</Text>
      <Button
        onPress={()=>props.handleChangeDispatch({ type: 'setCurrentPage', payload: "AuthForm" })}
      > Login </Button>
    </View>
  )
}