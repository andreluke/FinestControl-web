export interface TransactionTableProps {
  id: number
  createdAt: Date
  value: number
  isSpend: boolean
  tagColor: string
  tagName: string
  paymentIcon: string
}

import type { ComponentProps } from 'react'

export interface TransactionsTableProps extends ComponentProps<'div'> {
  transactions: TransactionTableProps[]
}
