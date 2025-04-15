export interface PaymentTableProps {
  id: number
  createdAt: Date
  updatedAt: Date | null
  name: string
  icon: string
  description: string
}

import type { ComponentProps } from 'react'

export interface PaymentsTableProps extends ComponentProps<'div'> {
  payments: PaymentTableProps[]
}
