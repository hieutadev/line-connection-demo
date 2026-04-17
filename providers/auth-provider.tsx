'use client'

import { AuthContext, AuthProps, createAuthStore } from '@/store/auth-store'
import { useState } from 'react'

type AuthProviderProps = React.PropsWithChildren<AuthProps>

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [store] = useState(() => createAuthStore(props))
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}