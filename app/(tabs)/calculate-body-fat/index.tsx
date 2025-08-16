import { ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { View } from 'tamagui';

export default function CalculateBodyFatIndex() {

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Scan food",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarHeight }}
        >
          <View>Text</View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

