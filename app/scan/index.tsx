import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import CameraUploader from '@/components/scan/CameraUploader';

export default function ScanIndex(){
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Scan food",
          headerRight: () => <HomeButton/>
        }}
      />
      <View style={{flex: 1}} >
        <Text>Scan index</Text>
        <CameraUploader/>
      </View>
    </>
  )
}