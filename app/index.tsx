import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import LoginScreen from '@/LoginScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log(firebaseUser);
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return user ? <LoginScreen /> : <LoginScreen />;
}
