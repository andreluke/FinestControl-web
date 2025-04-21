import type { ComponentProps } from 'react'
import type { TransactionTableProps } from '../tables/ITransactionTable'

export interface HistoricParams {
  id: number
  date: Date
  value: number
  isSpend: boolean
}

export interface HistoricWrapperParams extends ComponentProps<'div'> {
  transactions: TransactionTableProps[]
}
