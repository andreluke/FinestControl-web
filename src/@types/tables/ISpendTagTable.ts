import type { ComponentProps } from 'react'

export interface SpendTagTableProps {
  id: number
  name: string
  color: string
  monthGoal: number
  total: number
}

export interface SpendsTagTableProps extends ComponentProps<'div'> {
  tags: SpendTagTableProps[]
  pagination?: boolean
}
