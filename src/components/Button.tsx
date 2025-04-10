'use client'
import type { ButtonProps } from '@/@types/IButton'
import type { SideBarActive } from '@/@types/ISideBar'
import { useSidebarStore } from '@/stores/useSideBarStore'
import { useRouter } from 'next/navigation'

export function Button({
  isActive = false,
  id,
  children,
  ...props
}: ButtonProps) {
  const { setActive } = useSidebarStore()
  const router = useRouter()

  const handleClick = (id: SideBarActive) => {
    setActive(id)
    router.push(`/?tab=${id}`)
  }

  return (
    <button
      data-isactive={isActive}
      onClick={() => handleClick(id)}
      {...props}
      className="flex items-center gap-2 bg-dark-500 data-[isactive=true]:bg-brand-100/20 mx-auto p-6 lg:p-4 px-4 rounded-lg w-1/2 lg:w-full min-w-0 h-10 overflow-hidden text-dark-000 data-[isactive=true]:text-brand-100 transition-colors duration-300 ease-in-out cursor-pointer"
    >
      <div className="flex justify-center lg:justify-start items-center gap-2 w-full min-w-0">
        {children}
      </div>
    </button>
  )
}
