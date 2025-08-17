import { ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Calculator from '@/components/CalculateBodyFat/Calculator';

export default function CalculateBodyFatIndex() {

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Body Fat Calculator",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarHeight }}
        >
          <Calculator/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

