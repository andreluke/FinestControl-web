import type {
  PaymentTableProps,
  PaymentsTableProps,
} from '@/@types/tables/IPaymentTable'
import React from 'react'
import { Button } from '../ui/button'
import { paymentColumns } from './columns'
import { DataTable } from './ui/data-table'

type RemovedPaymentsTableProps = PaymentsTableProps & {
  onEdit: (payment: PaymentTableProps) => void
}

export function RemovedPaymentTable({
  payments,
  onEdit,
  ...props
}: RemovedPaymentsTableProps) {
  const [selectedPayments, setSelectedPayments] = React.useState<
    PaymentTableProps[]
  >([])

  const handleMultipleRestore = () => {
    for (const payment of selectedPayments) {
      onEdit(payment)
    }
  }

  return (
    <div
      className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
      {...props}
    >
      <DataTable
        columns={paymentColumns({
          onEdit,
          editMessage: 'Restaurar',
          selectable: true,
        })}
        data={payments}
        searchFields={['id', 'name', 'icon', 'createdAt', 'updatedAt']}
        searchPlaceholder="Filtrar tags..."
        defaultPageSize={5}
        onSelectionChange={setSelectedPayments}
        tableName="FormasDePagamentoRemovidas"
        actionSlot={
          <Button
            variant={'outline'}
            onClick={handleMultipleRestore}
            disabled={selectedPayments.length === 0}
          >
            Restaurar tags selecionadas
          </Button>
        }
      />
    </div>
  )
}
