import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { ScrollView, View } from 'react-native';
import UserDetails from '@/components/Settings/UserDetails';
import ColorPalette from '@/components/ColorPalette';
import { Button } from 'tamagui';
import { Firebase } from '@/providers/Firebase';

export default function SettingsIndex(){
  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Settings",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <ScrollView >

        <View style={{alignSelf: "center", margin: 10}} >
          <ColorPalette/>
        </View>

        <UserDetails/>

        <Button onPress={()=>{new Firebase()._signOut()}} >Log out</Button>

      </ScrollView>

    </>
  )
}