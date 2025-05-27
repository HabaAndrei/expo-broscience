import { createContext } from 'react'

type ThemeColorContextType = {
  themeColor: string
  setThemeColor: (color: string) => void
}

export const ThemeColorContext = createContext<ThemeColorContextType>({
  themeColor: '',
  setThemeColor: () => {},
})
