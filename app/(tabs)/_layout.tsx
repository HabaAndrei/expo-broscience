import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Home, Apple, Settings2, Croissant } from '@tamagui/lucide-icons'


export default function TabLayout() {

  const navigators = [
    {
      name: "index",
      title: "Home",
      icon: (focused: boolean) => <Home size={30} strokeWidth={focused ? 4 : 2} />,
      href: true
    },
    {
      name: "scan",
      title: "Add food",
      icon: (focused: boolean) => <Apple size={30} strokeWidth={focused ? 4 : 2} />,
      href: true
    },
    {
      name: "settings",
      title: "Settings",
      icon: (focused: boolean) => <Settings2 size={30} strokeWidth={focused ? 4 : 2} />,
      href: true
    },
    {
      name: "recipes",
      title: "Recipes",
      icon: (focused: boolean) => <Croissant size={30} strokeWidth={focused ? 4 : 2} />,
      href: '/recipes/'
    },
    {
      name: "search-food",
      title: "Search food",
      icon: (focused: boolean) => <></>,
      href: null
    },
    {
      name: "add-manualy",
      title: "Add manualy",
      icon: (focused: boolean) => <></>,
      href: null
    },
    {
      name: "calculate-body-fat",
      title: "Calculate body fat",
      icon: (focused: boolean) => <></>,
      href: null
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
            name={navigator?.name ? navigator.name : ''}
            options={{
              title: `${navigator.title ? navigator.title : ''}`,
              tabBarLabelStyle: {
                color: 'black', // overwrite color
              },
              tabBarIcon: ({ focused }) => navigator?.icon(focused),
              href: navigator?.href ? navigator?.href : null
            }}
          />
        })}
      </Tabs>
    </ProtectedRoute>
  );
}
