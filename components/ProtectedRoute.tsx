import { ReactNode, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native';
import LoadingOverlay from './LoadingOverlay';

export default function ProtectedRoute({ children }: { children: ReactNode }){

  const { user, isUserLoading } = useContext(UserContext);

  if (isUserLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LoadingOverlay></LoadingOverlay>
      </SafeAreaView>
    )
  }

  if (!user) {
    return <Redirect href="/login" />
  }

  return <>{children}</>
}