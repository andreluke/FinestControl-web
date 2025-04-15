import {
  type CreateTransaction200,
  type GetAllPaymentTypes200,
  type GetAllTags200,
  type GetAllTransactions200,
  type GetAllTransactions200TransactionsItem,
  type GetLastAmount200,
  getGetAllPaymentTypesQueryKey,
  getGetAllTagsQueryKey,
  getGetAllTransactionsQueryKey,
  getGetLastAmountQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function createTransactionOnSuccess(
  newTransaction: CreateTransaction200,
  queryClient: QueryClient
) {
  const tags = queryClient.getQueryData<GetAllTags200>(getGetAllTagsQueryKey())
  const payments = queryClient.getQueryData<GetAllPaymentTypes200>(
    getGetAllPaymentTypesQueryKey()
  )

  queryClient.setQueryData<GetAllTransactions200>(
    getGetAllTransactionsQueryKey({ limit: '10' }),
    oldData => {
      const old = oldData ?? { transactions: {} }

      const createdAtDate = newTransaction.createdAt
        ? new Date(newTransaction.createdAt)
        : new Date()
      const monthKey = `${createdAtDate.getFullYear()}-${createdAtDate.getMonth() + 1}`

      const tag = tags?.tags.find(tag => tag.id === newTransaction.tagId)
      const payment = payments?.paymentTypes.find(
        p => p.id === newTransaction.paymentTypeId
      )

      const newTx: GetAllTransactions200TransactionsItem = {
        id: newTransaction.id ?? 0,
        createdAt: newTransaction.createdAt ?? new Date().toISOString(),
        isSpend: newTransaction.isSpend,
        amount: newTransaction.amount,
        tagName: tag?.name ?? '',
        tagColor: tag?.color ?? '',
        paymentType: payment?.name ?? '',
        paymentTypeIcon: payment?.icon ?? '',
      }

      return {
        transactions: {
          ...old.transactions,
          [monthKey]: [newTx, ...(old.transactions[monthKey] ?? [])],
        },
      }
    }
  )

  queryClient.setQueryData<GetLastAmount200>(
    getGetLastAmountQueryKey(),
    oldAmount => {
      return {
        amount: newTransaction.isSpend
          ? (oldAmount?.total ?? 0) - newTransaction.amount
          : (oldAmount?.total ?? 0) + newTransaction.amount,
        id: oldAmount?.id ?? 0,
        total: oldAmount?.total ?? 0,
        lastAmount: oldAmount?.lastAmount ?? null,
        createdAt: oldAmount?.createdAt ?? null,
        lastTransaction: oldAmount?.lastTransaction ?? 0,
      }
    }
  )
}
