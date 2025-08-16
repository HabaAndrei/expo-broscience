import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { ScrollView, View, SafeAreaView } from 'react-native';
import UserDetails from '@/components/Settings/UserDetails';
import ColorPalette from '@/components/ColorPalette';
import { Button } from 'tamagui';
import { Firebase } from '@/providers/Firebase';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function SettingsIndex(){

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Settings",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />


      <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarHeight }}
          >

          <View style={{alignSelf: "center", margin: 10}} >
            <ColorPalette/>
          </View>

          <UserDetails/>

          <Button onPress={()=>{new Firebase()._signOut()}} >Log out</Button>

        </ScrollView>
      </SafeAreaView>

    </>
  )
}