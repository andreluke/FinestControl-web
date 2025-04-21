import {
  type CreateTransaction200,
  type GetAllPaymentTypes200,
  type GetAllTags200,
  type GetAllTransactions200,
  type GetAllTransactions200TransactionsItem,
  type GetMostUsedTags200Item,
  getGetAllPaymentTypesQueryKey,
  getGetAllTagsQueryKey,
  getGetAllTransactionsQueryKey,
  getGetMostUsedTagsQueryKey,
  getGetRoughAmountQueryKey,
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

      const tag = tags?.tags.find(t => t.id === newTransaction.tagId)
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

  queryClient.setQueryData<number>(getGetRoughAmountQueryKey(), lastAmount => {
    const old = lastAmount ?? 0

    return newTransaction.isSpend
      ? old - newTransaction.amount
      : old + newTransaction.amount
  })

  queryClient.setQueryData<GetMostUsedTags200Item[]>(
    getGetMostUsedTagsQueryKey({ limit: '5' }),
    oldData => {
      const existingTags = queryClient.getQueryData<GetMostUsedTags200Item[]>(
        getGetMostUsedTagsQueryKey({ limit: '5' })
      )

      if (!oldData || !existingTags) return oldData

      const existingTag = oldData.find(item => item.id === newTransaction.tagId)

      if (!existingTag) {
        return oldData
      }

      const updatedTagItem: GetMostUsedTags200Item = {
        id: existingTag.id ?? -1,
        name: existingTag.name || '',
        color: existingTag.color ?? '',
        monthGoal: existingTag.monthGoal ?? 0,
        usageCount: existingTag.usageCount + 1,
      }

      const updatedTags = oldData
        .filter(item => item.id !== existingTag.id)
        .concat(updatedTagItem)

      const sortedTags = updatedTags.sort((a, b) => b.usageCount - a.usageCount)

      return sortedTags
    }
  )
}
