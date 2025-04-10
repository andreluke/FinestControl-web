'use client'
import type { SideBarActive } from '@/@types/ISideBar'
import { useSidebarStore } from '@/stores/useSideBarStore'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function InitSidebarFromSearchParams() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') as SideBarActive | null
  const { setActive } = useSidebarStore()

  useEffect(() => {
    if (tab) {
      setActive(tab)
    }
  }, [tab, setActive])

  return null
}
