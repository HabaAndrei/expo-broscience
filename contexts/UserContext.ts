import { createContext } from 'react'

type UserContextType = {
  user: string | object | null
  setUser: (user: any) => void | any
}

export const UserContext = createContext<UserContextType>({
  user: '',
  setUser: () => {},
})
