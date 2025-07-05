import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';

export default function SearchFood() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Search food",
          headerRight: () => <HomeButton />
        }}
      />



    </>
  );
}
