import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import SearchBar from '@/components/SearchFood/SearchBar';
import { ScrollView, SafeAreaView } from 'react-native';
import NavigationBar from '@/components/Scan/NavigationBar';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function SearchFoodIndex() {

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Search food",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarHeight }}
        >
          <NavigationBar actualScreen="search" />
          <SearchBar/>
        </ScrollView>
      </SafeAreaView>

    </>
  );
}
