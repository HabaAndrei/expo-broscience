import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import SearchBar from '@/components/SearchFood/SearchBar';
import { ScrollView } from 'react-native'

export default function SearchFoodIndex() {
  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Search food",
          headerRight: () => <HomeButton />
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <SearchBar></SearchBar>
      </ScrollView>

    </>
  );
}
