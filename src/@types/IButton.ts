import type { ComponentProps } from 'react'
import type { SideBarActive } from './ISideBar'

export interface ButtonProps extends ComponentProps<'button'> {
  isActive?: boolean
  id: SideBarActive
}

export interface ButtonLinkProps extends ComponentProps<'span'> {
  name: 'credit-card' | 'layout-grid' | 'banknote-arrow-down' | 'tag'
  alt: string
}
