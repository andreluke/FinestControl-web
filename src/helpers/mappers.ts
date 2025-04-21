import type { PaymentTableProps } from '@/@types/tables/IPaymentTable'
import type { TagTableProps } from '@/@types/tables/ITagTable'
import type { TransactionTableProps } from '@/@types/tables/ITransactionTable'
import type {
  GetAllPaymentTypes200PaymentTypesItem,
  GetAllTags200TagsItem,
  GetAllTransactions200Transactions,
} from '@/http/api'

export function mapPaymentTypesToTableProps(
  items: GetAllPaymentTypes200PaymentTypesItem[]
): PaymentTableProps[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    icon: item.icon,
    createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
  }))
}

export function mapTagsToTableProps(
  items: GetAllTags200TagsItem[]
): TagTableProps[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    color: item.color,
    createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
    monthGoal: item.monthGoal,
  }))
}

export function mapTransactionsToTableProps(
  items: GetAllTransactions200Transactions
): TransactionTableProps[] {
  return Object.values(items).flatMap(transactions =>
    transactions.map(item => ({
      id: item.id,
      tagColor: item.tagColor,
      tagName: item.tagName,
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
      value: item.amount ?? 0,
      isSpend: item.isSpend ?? false,
      paymentIcon: item.paymentTypeIcon,
    }))
  )
}
