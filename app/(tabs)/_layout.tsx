import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Home, Scan } from '@tamagui/lucide-icons'


export default function TabLayout() {

  const navigators = [
    {
      name: "index",
      title: 'Home',
      icon: (focused: boolean) => <Home size={30} strokeWidth={focused ? 4 : 2} />
    },
    {
      name: "scan",
      title: 'Scan',
      icon: (focused: boolean) => <Scan size={30} strokeWidth={focused ? 4 : 2} />
    },
  ]


  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        {navigators.map((navigator, index)=>{
          return <Tabs.Screen
            key={index}
            name={navigator.name}
            options={{
              title: navigator.title,
              tabBarLabelStyle: {
                color: '', // overwrite color
              },
              tabBarIcon: ({ focused }) => <> {navigator.icon(focused)} </> ,
            }}
          />
        })}
      </Tabs>
    </ProtectedRoute>
  );
}
