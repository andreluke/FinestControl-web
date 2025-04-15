import {
  type GetAllTags200,
  type GetAllTags200TagsItem,
  type GetAllTransactions200,
  type GetAllTransactions200TransactionsItem,
  type UpdateTag200,
  getGetAllTagsQueryKey,
  getGetAllTransactionsQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function updateTagOnSuccess(
  updateTag: UpdateTag200,
  queryClient: QueryClient
) {
  queryClient.setQueryData(
    getGetAllTagsQueryKey(),
    (oldData: GetAllTags200) => {
      if (!oldData) return { tags: [updateTag] }

      const updatedTagItem: GetAllTags200TagsItem = {
        id: updateTag.id ?? -1,
        name: updateTag.name || '',
        description: updateTag.description || '',
        color: updateTag.color ?? '',
        createdAt: updateTag.createdAt ?? null,
        updatedAt: new Date().toDateString(),
        removedAt: null,
      }

      const updatedTags = oldData.tags
        .filter(item => item.id !== updateTag.id)
        .concat(updatedTagItem)

      const sortedTags = updatedTags.sort((a, b) => b.id - a.id)

      return { tags: sortedTags }
    }
  )

  queryClient.setQueryData<GetAllTransactions200>(
    getGetAllTransactionsQueryKey({ limit: '10' }),
    oldData => {
      const old = oldData ?? { transactions: {} }

      const updatedTransactions = Object.keys(old.transactions).reduce(
        (acc, monthKey) => {
          acc[monthKey] = old.transactions[monthKey].map(transaction => {
            if (transaction.tagName === updateTag.name) {
              return {
                ...transaction,
                tagName: updateTag.name,
                tagColor: updateTag.color ?? '', // Ensure tagColor is always a string
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
