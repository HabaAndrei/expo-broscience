import { createContext } from 'react'
import { User } from 'firebase/auth';

type UserContextType = {
  user: User | null | undefined | string
  isUserLoading: boolean
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isUserLoading: true,
})
