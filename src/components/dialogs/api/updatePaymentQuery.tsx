import {
  type GetAllPaymentTypes200,
  type GetAllPaymentTypes200PaymentTypesItem,
  type GetAllTransactions200,
  type GetAllTransactions200TransactionsItem,
  type UpdatePaymentType200,
  getGetAllPaymentTypesQueryKey,
  getGetAllTransactionsQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function updatePaymentOnSuccess(
  updatePayment: UpdatePaymentType200,
  queryClient: QueryClient
) {
  queryClient.setQueryData(
    getGetAllPaymentTypesQueryKey(),
    (oldData: GetAllPaymentTypes200) => {
      if (!oldData) return { paymentTypes: [updatePayment] }

      const updatedPaymentItem: GetAllPaymentTypes200PaymentTypesItem = {
        id: updatePayment.id ?? -1,
        name: updatePayment.name || '',
        description: updatePayment.description || '',
        icon: updatePayment.icon ?? '',
        createdAt: updatePayment.createdAt ?? null,
        updatedAt: new Date().toDateString(),
      }

      const updatedPaymentTypes = oldData.paymentTypes
        .filter(item => item.id !== updatePayment.id)
        .concat(updatedPaymentItem)

      const sortedPaymentTypes = updatedPaymentTypes.sort((a, b) => b.id - a.id)

      return { paymentTypes: sortedPaymentTypes }
    }
  )

  queryClient.setQueryData<GetAllTransactions200>(
    getGetAllTransactionsQueryKey({ limit: '10' }),
    oldData => {
      const old = oldData ?? { transactions: {} }

      const updatedTransactions = Object.keys(old.transactions).reduce(
        (acc, monthKey) => {
          acc[monthKey] = old.transactions[monthKey].map(transaction => {
            if (transaction.paymentType === updatePayment.name) {
              return {
                ...transaction,
                paymentType: updatePayment.name,
                paymentTypeIcon: updatePayment.icon ?? '',
              }
            }
            return transaction
          })
          return acc
        },
        {} as Record<string, GetAllTransactions200TransactionsItem[]>
      )

      const allTransactions = Object.values(updatedTransactions).flat()

      allTransactions.sort((a, b) => b.id - a.id)

      return {
        transactions: allTransactions.reduce(
          (acc, transaction) => {
            const createdAtDate = new Date(transaction.createdAt ?? '')
            const monthKey = `${createdAtDate.getFullYear()}-${createdAtDate.getMonth() + 1}`

            if (!acc[monthKey]) {
              acc[monthKey] = []
            }

            acc[monthKey].push(transaction)
            return acc
          },
          {} as Record<string, GetAllTransactions200TransactionsItem[]>
        ),
      }
    }
  )
}
