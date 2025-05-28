import { ThemedView } from '@/components/ThemedView'
import { Button, XGroup, XStack, YStack, Theme } from 'tamagui'
import { useContext } from 'react';
import { ThemeColorContext } from '@/hooks/ThemeColorContext'
import { useAuth } from '@/context/auth';
import { View, ActivityIndicator, Text } from "react-native";
import LoginForm from '@/components/LoginForm';

const index = () => {

  ////////////////////////////////////////////////////////////////////////////////////////////

  const { setThemeColor } = useContext(ThemeColorContext);
  {/* <Button alignSelf="center"  size="$6" onPress={()=> setThemeColor("yellow") }>
    Yellow
  </Button>
  <Button alignSelf="center"  size="$6" onPress={()=> setThemeColor("red") }>
    red
  </Button> */}

  ////////////////////////////////////////////////////////////////////////////////////////////

  const { user, isLoading, signOut } = useAuth();
  console.log(user, ' <<<<==== use ');

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
        <ActivityIndicator/>
      </View>
    )
  }

  if (!user) {
    return <LoginForm/>
  }

  return (
    <ThemedView style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Index screen </Text>
      <Button onPress={signOut} >Sign out</Button>
    </ThemedView>
  )
}

export default index