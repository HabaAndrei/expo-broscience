import { Button, Group, Text, YStack } from 'tamagui'
import { useRouter } from 'expo-router';
import { Search, Scan } from '@tamagui/lucide-icons'


export default function NavigationBar({actualScreen}: {actualScreen: string}){
  const router = useRouter();
  return (
    <YStack padding="$3" space="$2" alignItems="center">
      <Group orientation="horizontal">
        <Group.Item>
          <Button onPress={()=>router.replace('/scan')}>
            <Scan size={20} strokeWidth={actualScreen == 'scan' ? 4 : 2} />
            <Text fontSize={actualScreen == 'scan' ? 18 : 13} >Scan</Text>
          </Button>
        </Group.Item>
        <Group.Item>
          <Button onPress={()=>router.replace('/searchFood')}>
            <Search size={20} strokeWidth={actualScreen == 'search' ? 4 : 2} />
            <Text fontSize={actualScreen == 'search' ? 18 : 13} >Search</Text>
          </Button>
        </Group.Item>
      </Group>
    </YStack>
  )
}