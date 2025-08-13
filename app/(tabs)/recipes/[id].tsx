import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { Text, View } from 'tamagui';

export default function RecipeWithId() {
  // This pulls the `id` from the route, e.g., /recipes/123
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Recipe`,
        }}
      />

      <ScrollView>
        <View>
          <Text>Recipe ID: {id}</Text>
        </View>
      </ScrollView>
    </>
  );
}
