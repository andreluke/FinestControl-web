export interface TagTableProps {
  id: number
  name: string
  description: string
  color: string
  monthGoal: number
  createdAt: Date
  updatedAt: Date | null
}

import type { ComponentProps } from 'react'

export interface TagsTableProps extends ComponentProps<'div'> {
  tags: TagTableProps[]
}
