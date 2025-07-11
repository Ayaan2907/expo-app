import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface User {
  usrId: string
  usrEmail: string
  usrName: string
  usrType: 'A' | 'P' | 'S'
  usrCont: string
}

interface AuthState {
  isSignedIn: boolean
  isLoaded: boolean
  user: User | null
  session: { id: string } | null
  
  // Actions
  setUser: (user: User) => void
  setSession: (session: { id: string }) => void
  signOut: () => void
  setLoaded: (loaded: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isSignedIn: false,
      isLoaded: true,
      user: null,
      session: null,

      setUser: (user: User) => {
        set({ 
          user, 
          isSignedIn: true,
          session: { id: `session_${Date.now()}` }
        })
      },

      setSession: (session: { id: string }) => {
        set({ session, isSignedIn: true })
      },

      signOut: () => {
        set({ 
          isSignedIn: false, 
          user: null, 
          session: null 
        })
      },

      setLoaded: (loaded: boolean) => {
        set({ isLoaded: loaded })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
) 