import { useEffect, useContext, useState } from 'react'
import { SafeAreaView, View, Text } from 'react-native';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import LoadingOverlay from '@/components/LoadingOveraly';

const index = () => {
  const {user} = useContext(UserContext);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setIsReady(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(()=>{
    if (!isReady)return;
    if (user) {
      router.navigate('/functionalities')
    } else {
      router.navigate('/login')
    }
  }, [user, isReady]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingOverlay></LoadingOverlay>
    </SafeAreaView>

  )
}

export default index