'use client'
import type { MenuItem } from '@/@types/ISideBar'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/ButtonLink'
import logoAsset from '@/images/logoNoBackground.png'
import { useSidebarStore } from '@/stores/useSideBarStore'
import Image from 'next/image'

const menuItems: MenuItem[] = [
  { id: 'dashboard', icon: 'layout-grid', label: 'Dashboard' },
  { id: 'pagamento', icon: 'credit-card', label: 'Pagamento' },
  { id: 'transacao', icon: 'banknote-arrow-down', label: 'Transação' },
  { id: 'tags', icon: 'tag', label: 'Tags' },
]

export function SideBar() {
  const { active } = useSidebarStore()
  return (
    <aside className="hidden top-0 left-0 fixed md:flex flex-col gap-3 bg-dark-500 p-6 w-1/6 h-screen min-h-dvh">
      <header className="flex justify-center mb-6">
        <Image
          src={logoAsset}
          width={200}
          height={200}
          alt="logo"
          className="drop-shadow-4xl rounded-lg"
        />
      </header>
      <ul className="space-y-4">
        {menuItems.map(item => (
          <Button id={item.id} key={item.id} isActive={item.id === active}>
            <ButtonLink name={item.icon} alt={item.label}>
              {item.label}
            </ButtonLink>
          </Button>
        ))}
      </ul>
    </aside>
  )
}
