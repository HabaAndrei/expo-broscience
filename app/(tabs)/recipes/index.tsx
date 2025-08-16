import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { ScrollView } from 'react-native';
import Main from '@/components/Recipes/Main';

export default function RecipesIndex() {
  return (
    <>

      <Stack.Screen
        options={{
          headerTitle: "Recipes",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <ScrollView >
        <Main/>
      </ScrollView>

    </>
  );
}
