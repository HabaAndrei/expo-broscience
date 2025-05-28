import { View, Text, Button } from 'react-native';
import { useAuth } from '@/context/auth';

export default function LoginForm() {

  const { signIn } = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <Button  title={"Sign In with google"} onPress={signIn} />
    </View>
  )
}