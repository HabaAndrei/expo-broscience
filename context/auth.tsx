import { createContext, ReactNode, useContext, useState } from 'react';
import { AuthError, AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { maybeCompleteAuthSession } from 'expo-web-browser';
// import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import { BASE_URL } from '@/constants';

maybeCompleteAuthSession();

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
  provider?: string;
  exp?: number;
  cookieExpiration?: number;
}

const AuthContext = createContext({
  user: null as AuthUser | null,
  signIn: () => {},
  signOut: () => {},
  fetchWithAuth: async (url: string, options?: RequestInit) => Promise.resolve(new Response()),
  isLoading: false,
  error: null as AuthError | null ,
})

const config: AuthRequestConfig = {
  clientId: "google",
  scopes: ["openid", "profile", "email"],
  redirectUri: makeRedirectUri(),
}

const discovery: DiscoveryDocument = {
  authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
  tokenEndpoint: `${BASE_URL}/api/auth/token`
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null >(null)

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  console.log({config, discovery});


  const signIn = async () => {
    console.log("we are in login ---- ");
    try {
      if (!request) {
        console.log('no request');
        return;
      }
      await promptAsync();
    } catch (e) {
      console.log(e, ' we catch this error !! ');
    }
  };

  const signOut = async () => {};

  const fetchWithAuth = async (url: string, options?: RequestInit) => {};

  return <AuthContext.Provider  value={{
    user,
    signIn,
    signOut,
    fetchWithAuth,
    isLoading,
    error,
  }} >{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context  = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth must be within an AuthProvider");
  }
  return context;
}