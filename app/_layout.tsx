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
import { onAuthStateChanged, User } from 'firebase/auth';
import { StorageService } from '@/providers/StorageService';
import type { ThemeName } from 'tamagui'

export default function RootLayout() {

  // if you want to have dark and light theme
  // const colorScheme = useColorScheme();
  let colorScheme = 'light';

  const [themeColor, setThemeColor] = useState<ThemeName>("blue");
  const [user, setUser] = useState<User | null | undefined | string>(null);
  const [loading, setLoading] = useState(true);

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
      setUser(_user);
      setLoading(false);
    });
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <ThemeColorContext.Provider value={{themeColor, setThemeColor}}>
        <UserContext.Provider value={{user, loading}}>
          <Theme name={themeColor}>
            <StatusBar style="dark" />
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="test" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
              </Stack>
            </ThemeProvider>
          </Theme>
        </UserContext.Provider>
        </ThemeColorContext.Provider>
    </TamaguiProvider>
  )
}
