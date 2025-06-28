import { Stack } from 'expo-router';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Layout() {
  return (
    <ProtectedRoute>
      <Stack screenOptions={{ headerShown: true }}/>
    </ProtectedRoute>
  );
}