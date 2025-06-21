import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import Camera from '@/components/scan/Camera';

export default function ScanIndex(){
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: "Scan food",
          headerRight: () => <HomeButton/>
        }}
      />
      <Camera/>
      <Text>Scan index</Text>
    </View>
  )
}