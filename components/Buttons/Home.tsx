import { Button } from 'tamagui';
import { Home } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router';

export default function HomeButton(){
  const router = useRouter()
  return (
    <Button
      onPress={() => router.navigate("/functionalities")}
      icon={Home}
      marginInline={8}
    >
    </Button>
  )
}