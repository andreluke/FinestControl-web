'use client'

import type { TransactionsTableProps } from '@/@types/tables/ITransactionTable'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { Tag } from '../Tags'
import { CreateTransactionDialog } from '../dialogs/createTransactionDialog'
import { transactionColumns } from './columns'
import { DataTable } from './ui/data-table'

export function TransactionsTable({
  transactions,
  pagination = false,
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
        searchFields={['id', 'value', 'tagName', 'paymentIcon', 'createdAt']}
        searchPlaceholder="Filtrar transações..."
        pagination={pagination}
        thresholdDefault={0.2}
        tableName="Transações"
        tooltipContentFn={row => {
          const formatted = (row.value / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          return (
            <div className="flex flex-col gap-2">
              <span className="text-sm">
                <span className="font-medium">ID:</span> {row.id}
              </span>
              <span className="text-sm">
                <span className="font-medium">Valor:</span> R${' '}
                {row.isSpend ? '-' : ''}
                {formatted}
              </span>
              <span className="flex flex-row items-center gap-2 text-sm">
                <span className="font-medium">Tag:</span>
                <Tag color={row.tagColor} name={row.tagName} />
              </span>
              <span className="flex flex-row items-center gap-2 text-sm">
                <span className="font-medium">Pagamento:</span>
                <DynamicIcon name={row.paymentIcon as IconName} />
              </span>
              <span className="text-sm">
                <span className="font-medium">Data:</span>{' '}
                {row.createdAt.toLocaleDateString()}
              </span>
            </div>
          )
        }}
      />
    </div>
  )
}
