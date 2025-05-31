import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { useGoogleAuth } from '@/GoogleAuth';

export default function Index() {
  const [user, setUser] = useState(null);
  const { signIn, request } = useGoogleAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log(firebaseUser, ' -------- uuuussseeerrrr  -------');
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <Text>Welcome, {user.email}</Text>
      ) : (
        <Button
          title="Sign in with Google"
          onPress={() => signIn()}
          disabled={!request}
        />
      )}
    </View>
  );
}