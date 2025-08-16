import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { ScrollView, SafeAreaView } from 'react-native';
import Main from '@/components/Recipes/Main';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function RecipesIndex() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Recipes",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarHeight }}
        >
          <Main />
        </ScrollView>
      </SafeAreaView>

    </>
  );
}
