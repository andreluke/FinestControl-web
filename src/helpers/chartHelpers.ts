import type { GetAllTransactionsWithMonth200 } from '@/http/api'

const getLast4Months = () => {
  const months: string[] = []
  const currentDate = new Date()

  for (let i = 0; i < 4; i++) {
    const month = new Date(currentDate)
    month.setMonth(currentDate.getMonth() - i)

    const year = month.getFullYear()
    const monthNumber = month.getMonth() + 1
    const formattedMonth = `${year}-${monthNumber}`

    months.push(formattedMonth)
  }

  return months.reverse()
}

export const getFilteredTransactions = (
  monthTransactions: GetAllTransactionsWithMonth200
) => {
  const last4Months = getLast4Months()

  const filteredTransactions = Object.entries(monthTransactions)
    .filter(([month]) => last4Months.includes(month))
    .reduce((acc, [month, data]) => {
      acc[month] = data
      return acc
    }, {} as GetAllTransactionsWithMonth200)

  return filteredTransactions
}

export type TransactionDataType = ReturnType<typeof getFilteredTransactions>
export type TransactionChartType =
  TransactionDataType[keyof TransactionDataType]
