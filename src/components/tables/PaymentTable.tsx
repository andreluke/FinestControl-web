'use client'

import type {
  PaymentTableProps,
  PaymentsTableProps,
} from '@/@types/tables/IPaymentTable'
import { useState } from 'react'
import { CreatePaymentDialog } from '../dialogs/createPaymentDialog'
import { UpdatePaymentDialog } from '../dialogs/updatePaymentDialog'
import { paymentColumns } from './columns'
import { DataTable } from './ui/data-table'

export function PaymentTable({ payments, ...props }: PaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTableProps | null>(null)

  return (
    <>
      <div
        className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
        {...props}
      >
        <DataTable
          columns={paymentColumns}
          data={payments}
          onRowClick={setSelectedPayment}
          actionSlot={<CreatePaymentDialog />}
          searchFields={['icon', 'name', 'id', 'createdAt', 'description']}
        />
      </div>

      <UpdatePaymentDialog
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </>
  )
}
