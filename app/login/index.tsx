import { ScrollView, SafeAreaView } from 'react-native';
import AuthForm from '@/components/userDetails/AuthForm';

export default function LoginIndex(){

  return (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
      }}
    >
      <AuthForm />
    </ScrollView>
  </SafeAreaView>
  )
}