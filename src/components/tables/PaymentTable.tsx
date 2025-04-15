'use client'

import type {
  PaymentTableProps,
  PaymentsTableProps,
} from '@/@types/tables/IPaymentTable'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { useState } from 'react'
import { UpdatePaymentDialog } from '../dialogs/updatePaymentDialog'

export function PaymentTable({ payments, ...props }: PaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTableProps | null>(null)

  return (
    <>
      <div
        className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
        {...props}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead>Última atualização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map(py => (
              <TableRow
                key={py.id}
                className="cursor-pointer"
                onClick={() => setSelectedPayment(py)}
              >
                <TableCell className="font-medium">{`#${py.id}`}</TableCell>
                <TableCell>{py.name}</TableCell>
                <TableCell>
                  <DynamicIcon name={py.icon as IconName} />
                </TableCell>
                <TableCell>{py.description}</TableCell>
                <TableCell>{py.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  {py.updatedAt ? py.updatedAt.toLocaleDateString() : '---'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UpdatePaymentDialog
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </>
  )
}
