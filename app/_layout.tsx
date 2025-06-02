import '../tamagui-web.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
// import { useColorScheme } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { tamaguiConfig } from '../tamagui.config'
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeColorContext } from '@/contexts/ThemeColorContext';
import { UserContext } from '@/contexts/UserContext';

export default function RootLayout() {

  // if you want to have dark and light theme
  // const colorScheme = useColorScheme();
  let colorScheme = 'light';

  const [themeColor, setThemeColor] = useState("blue");
  const [user, setUser] = useState(null);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <ThemeColorContext.Provider value={{themeColor, setThemeColor}}>
        <UserContext.Provider value={{user, setUser}}>
          <Theme name={themeColor}>
            <StatusBar style="dark" />
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="test" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="functionalities" />
                <Stack.Screen name="login" />
              </Stack>
            </ThemeProvider>
          </Theme>
        </UserContext.Provider>
        </ThemeColorContext.Provider>
    </TamaguiProvider>
  )
}
