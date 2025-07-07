import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import SearchBar from '@/components/SearchFood/SearchBar';

export default function SearchFoodIndex() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Search food",
          headerRight: () => <HomeButton />
        }}
      />

      <SearchBar></SearchBar>

    </>
  );
}
