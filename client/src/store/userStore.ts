import { IUser } from '@/types/user'
import { useStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'



type UserStoreType = {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export const userStore = createStore<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export const useUserStore = () => useStore(userStore)
