import type { GetAllTransactionsWithMonth200 } from '@/http/api'

import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type TransactionData = {
  [monthKey: string]: {
    details: {
      totalSpends: number
      totalIncomes: number
    }
  }
}

export type ChartEntry = {
  month: string
  spend: number
  income: number
}

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

export function getChartData(transactions: TransactionData): ChartEntry[] {
  return Object.entries(transactions).map(([monthKey, data]) => {
    const date = parse(monthKey, 'yyyy-MM', new Date())
    const month = format(date, 'MMMM', { locale: ptBR })

    return {
      month: month.charAt(0).toUpperCase() + month.slice(1),
      spend: data.details.totalSpends,
      income: data.details.totalIncomes,
    }
  })
}
