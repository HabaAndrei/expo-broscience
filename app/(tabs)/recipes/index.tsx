import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import { ScrollView } from 'react-native';
import { Text, View } from 'tamagui';

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
        <View>
          <Text>okookok</Text>
        </View>
      </ScrollView>

    </>
  );
}
