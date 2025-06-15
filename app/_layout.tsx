import '../tamagui-web.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
// import { useColorScheme } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { tamaguiConfig } from '../tamagui.config'
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeColorContext } from '@/contexts/ThemeColorContext';
import { UserContext } from '@/contexts/UserContext';
import { auth } from '@/providers/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { StorageService } from '@/providers/StorageService';
import type { ThemeName } from 'tamagui'

export default function RootLayout() {

  // if you want to have dark and light theme
  // const colorScheme = useColorScheme();
  let colorScheme = 'light';

  const [themeColor, setThemeColor] = useState<ThemeName>("blue");
  const [user, setUser] = useState<any>(null);

  useEffect(()=>{
    reloadUser();
    getThemeColor();
  }, []);

  async function getThemeColor(){
    const resultTheme = await StorageService.getStorage("themeColor");
    if (resultTheme.isResolved && resultTheme.data) setThemeColor(resultTheme.data)
  }

  function reloadUser(){
    if (!auth) return;
    onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(null);
      }
    });
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <ThemeColorContext.Provider value={{themeColor, setThemeColor}}>
        <UserContext.Provider value={{user, setUser}}>
          <Theme name={themeColor}>
            <StatusBar style="dark" />
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="test" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                <Stack.Screen name="functionalities" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
              </Stack>
            </ThemeProvider>
          </Theme>
        </UserContext.Provider>
        </ThemeColorContext.Provider>
    </TamaguiProvider>
  )
}
