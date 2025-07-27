import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import SearchBar from '@/components/SearchFood/SearchBar';
import { SafeAreaView } from 'react-native'

export default function SearchFoodIndex() {
  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Search food",
          headerRight: () => <HomeButton />
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar></SearchBar>
      </SafeAreaView>

    </>
  );
}
