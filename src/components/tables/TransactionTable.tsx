'use client'

import type { TransactionsTableProps } from '@/@types/tables/ITransactionTable'
import { CreateTransactionDialog } from '../dialogs/createTransactionDialog'
import { transactionColumns } from './columns'
import { DataTable } from './ui/data-table'

export function TransactionsTable({
  transactions,
  ...props
}: TransactionsTableProps) {
  return (
    <div
      className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
      {...props}
    >
      <DataTable
        columns={transactionColumns}
        data={transactions}
        actionSlot={<CreateTransactionDialog />}
        searchFields={['id', 'value', 'tagName', 'paymentIcon']}
      />
    </div>
  )
}
