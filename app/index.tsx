import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useGoogleAuth } from '@/GoogleAuth';
import { View, Button } from 'react-native';

export default function App() {
  const [user, setUser] = useState(null);
  const { signIn, request } = useGoogleAuth();


  setTimeout(()=>{
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log(firebaseUser, ' -------- uuuussseeerrrr  -------');
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, 2000);

  useEffect(() => {
    ''
  }, []);

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