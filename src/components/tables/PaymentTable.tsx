'use client'

import type {
  PaymentTableProps,
  PaymentsTableProps,
} from '@/@types/tables/IPaymentTable'
import { useState } from 'react'
import { RemovePaymentAlert } from '../alerts/removePaymentAlert'
import { CreatePaymentDialog } from '../dialogs/createPaymentDialog'
import { ListRemovedPaymentDialog } from '../dialogs/listRemovedPaymentDialog'
import { UpdatePaymentDialog } from '../dialogs/updatePaymentDialog'
import { paymentColumns } from './columns'
import { DataTable } from './ui/data-table'

export function PaymentTable({ payments, ...props }: PaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTableProps | null>(null)

  const onEdit = (paymentType: PaymentTableProps) => {
    setSelectedPayment(paymentType)
  }

  const deleteTrigger = (payment: PaymentTableProps) => (
    <RemovePaymentAlert
      id={payment.id.toString()}
      onSuccessClose={() => {}}
      asDropdownItem
    />
  )

  return (
    <>
      <div
        className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
        {...props}
      >
        <DataTable
          columns={paymentColumns({ onEdit, deleteTrigger })}
          data={payments}
          tableName="FormasDePagamento"
          actionSlot={
            <>
              <CreatePaymentDialog />
              <ListRemovedPaymentDialog />
            </>
          }
          searchFields={['icon', 'name', 'id', 'createdAt', 'description']}
          searchPlaceholder="Filtrar formas de pagamento..."
        />
      </div>

      <UpdatePaymentDialog
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </>
  )
}
