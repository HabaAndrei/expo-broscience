import { Text, styled, Card, YStack, XStack } from 'tamagui'
import { Settings, Scan } from '@tamagui/lucide-icons'
import { Pressable, ScrollView } from 'react-native'
import ColorPalette from '@/components/ColorPalette';
import { useRouter } from 'expo-router';


const StyledCard = styled(Card, {
  size: '$4',
  elevate: true,
  bordered: true,
  padding: '$4',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$8',
})

const IconLabel = styled(Text, {
  fontSize: '$5',
  marginTop: '$2',
  textAlign: 'center',
  fontWeight: '600',
})

export function DemoCard({name, icon, func, ...props}: any) {
  return (
    <Pressable onPress={() => func()}>
      <YStack alignItems="center" space="$2">
        <StyledCard {...props}>
          {icon}
        </StyledCard>
        <IconLabel>{name}</IconLabel>
      </YStack>
    </Pressable>
  )
}

export default function Menu() {

  const router = useRouter()

  const functionalities = [
    {
      name: "Tools",
      backgroundColor: '#e0e0e0',
      buttons: [
        {name: "Scan", icon: <Scan size={40}/>, func: ()=>router.replace('/scan')},
        {name: "Settings", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings", icon: <Settings size={40}/>, func: ()=>console.log('---') },

      ]
    },
    {
      name: "Tools 2",
      buttons: [
        {name: "Settings 2", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings 2", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings 2", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings 2", icon: <Settings size={40}/>, func: ()=>console.log('---') },
      ]
    },
    {
      name: "Tools 3",
      backgroundColor: '#e0e0e0',
      buttons: [
        {name: "Settings 3", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings 3", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings 3", icon: <Settings size={40}/>, func: ()=>console.log('---') },
        {name: "Settings 3", icon: <Settings size={40}/>, func: ()=>console.log('---') },

      ]
    },
  ]

  return (
    <YStack space="$4" padding="$4" flex={1}>

      {functionalities.map((category, index)=>{
        return (
          <YStack space="$2" key={index}
            style={{
              backgroundColor: category?.backgroundColor ? category?.backgroundColor : '',
              borderRadius: 12,
              padding: 8,
              marginBottom: 24
            }}
          >
            <Text fontSize="$6" fontWeight="600" color="#333" marginBottom={4}>
              {category.name}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <XStack space="$5" paddingHorizontal="$2">
                {category.buttons.map((button, i)=>{
                  return (
                    <DemoCard
                      key={i}
                      name={button.name}
                      icon={button.icon}
                      func={button.func}
                    />
                  )
                })}
              </XStack>
            </ScrollView>
          </YStack>
        )
      })}

      <ColorPalette />
    </YStack>
  )
}