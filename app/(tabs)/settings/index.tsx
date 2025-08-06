import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { ScrollView } from 'react-native';
import UserDetails from '@/components/Settings/UserDetails';

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
        <UserDetails/>
      </ScrollView>

    </>
  )
}