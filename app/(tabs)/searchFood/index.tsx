import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import SearchBar from '@/components/SearchFood/SearchBar';
import { ScrollView } from 'react-native';
import NavigationBar from '@/components/Scan/NavigationBar';

export default function SearchFoodIndex() {
  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Search food",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <ScrollView >
        <NavigationBar actualScreen="search" />
        <SearchBar/>
      </ScrollView>

    </>
  );
}
