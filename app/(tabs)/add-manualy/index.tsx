import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import NavigationBar from '@/components/Scan/NavigationBar';
import FormFoodManualy from '@/components/AddManualy/FormFoodManualy';

export default function AddManualyIndex() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Add manualy",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <NavigationBar actualScreen="add-manualy" />
          <FormFoodManualy/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 50,
  }
});
