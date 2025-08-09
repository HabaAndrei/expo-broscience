import { Button, Group, Text, YStack } from 'tamagui'
import { useRouter } from 'expo-router';
import { Search, Scan, Hand } from '@tamagui/lucide-icons'


export default function NavigationBar({actualScreen}: {actualScreen: string}){
  const router = useRouter();
  return (
    <YStack  pt="$3" space="$1" alignItems="center">
      <Group orientation="horizontal">
        <Group.Item>
          <Button onPress={()=>router.replace('/scan')}>
            <Scan size={20} strokeWidth={actualScreen == 'scan' ? 3 : 2} />
            <Text fontSize={actualScreen == 'scan' ? 15 : 12} >Scan</Text>
          </Button>
        </Group.Item>
        <Group.Item>
          <Button onPress={()=>router.replace('/search-food')}>
            <Search size={20} strokeWidth={actualScreen == 'search' ? 3 : 2} />
            <Text fontSize={actualScreen == 'search' ? 15 : 12} >Search</Text>
          </Button>
        </Group.Item>
        <Group.Item>
          <Button onPress={()=>router.replace('/add-manualy')}>
            <Hand size={20} strokeWidth={actualScreen == 'add-manualy' ? 3 : 2} />
            <Text fontSize={actualScreen == 'add-manualy' ? 15 : 12} >Add manualy</Text>
          </Button>
        </Group.Item>
      </Group>
    </YStack>
  )
}