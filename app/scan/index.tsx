import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';

export default function ScanIndex(){
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: "Scan food",
          headerRight: () => <HomeButton/>
        }}
      />
      <Text>Scan index</Text>
    </View>
  )
}