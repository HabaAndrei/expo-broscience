import { createContext } from 'react'
import type { ThemeName } from 'tamagui'
import type { Dispatch, SetStateAction } from 'react'

type ThemeColorContextType = {
  themeColor: ThemeName
  setThemeColor: Dispatch<SetStateAction<ThemeName>>
}

export const ThemeColorContext = createContext<ThemeColorContextType>({
  themeColor: "blue",
  setThemeColor: () => {},
})
