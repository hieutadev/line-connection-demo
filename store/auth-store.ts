import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

export interface AuthProps {
  token: string | null
}

interface BearState extends AuthProps {
  setToken: (token: string) => void
  clearToken: () => void
}

export const createAuthStore = (initProps?: Partial<AuthProps>) => {
  const DEFAULT_PROPS: AuthProps = {
    token: null,
  }
  return createStore<BearState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),
  }))
}

type AuthStore = ReturnType<typeof createAuthStore>

export const AuthContext = createContext<AuthStore | null>(null)

export const useAuthStore = () => {
  const store = useContext(AuthContext)
  if (!store) {
    throw new Error('useAuthStore must be used within an AuthProvider')
  }
  const result = useStore(store)
  const headers = {
    Authorization: `Bearer ${result.token}`,
  }
  return { ...result, headers }
}