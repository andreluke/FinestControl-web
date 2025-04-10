export type SideBarActive = 'dashboard' | 'pagamento' | 'transacao' | 'tags'

export type Label =
  | 'credit-card'
  | 'layout-grid'
  | 'banknote-arrow-down'
  | 'tag'

export type MenuItem = {
  id: SideBarActive
  icon: Label
  label: string
}

export interface SideBarProps {
  active: 'dashboard' | 'pagamento' | 'transacao' | 'tags'
}
