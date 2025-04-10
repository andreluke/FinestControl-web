import type { SideBarActive } from '@/@types/ISideBar'
import { create } from 'zustand'

interface SideBarState {
  active: SideBarActive
  setActive: (active: SideBarActive) => void
}

export const useSidebarStore = create<SideBarState>(set => ({
  active: 'dashboard',
  setActive: active => set({ active }),
}))
