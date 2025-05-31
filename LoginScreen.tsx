import { View, Button } from 'react-native';
import { useGoogleAuth } from './GoogleAuth';

export default function LoginScreen() {
  const { signIn, request } = useGoogleAuth();

  return (
    <View>
      <Button
        title="Sign in with Google"
        onPress={() => signIn()}
        disabled={!request}
      />
    </View>
  );
}