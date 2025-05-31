import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import LoginScreen from '@/LoginScreen';

export default function App() {
  const [user, setUser] = useState(null);

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

  return user ? <LoginScreen /> : <LoginScreen />;
}