import '../tamagui-web.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
// import { useColorScheme } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { tamaguiConfig } from '../tamagui.config'
import { useState } from 'react';

import { ThemeColorContext } from '@/hooks/ThemeColorContext';

export default function RootLayout() {

  // if you want to have dark and light theme
  // const colorScheme = useColorScheme();
  let colorScheme = 'light';

  const [themeColor, setThemeColor] = useState("blue");

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <ThemeColorContext.Provider value={{themeColor, setThemeColor}}>
        <Theme name={themeColor}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="test" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          </ThemeProvider>
        </Theme>
      </ThemeColorContext.Provider>
    </TamaguiProvider>
  )
}
