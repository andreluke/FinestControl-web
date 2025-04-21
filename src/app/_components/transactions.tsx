import { CurrencyCard } from '@/components/CurrencyCard'
import { TransactionChart } from '@/components/charts/TransactionChart'
import { TransactionsTable } from '@/components/tables/TransactionTable'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getChartData, getFilteredTransactions } from '@/helpers/chartHelpers'
import { mapTransactionsToTableProps } from '@/helpers/mappers'
import {
  useGetAllTags,
  useGetAllTagsWithSpends,
  useGetAllTransactions,
  useGetAllTransactionsWithMonth,
  useGetRoughAmount,
} from '@/http/api'
import NumberFlow from '@number-flow/react'

export default function Transacao() {
  const now = new Date()
  const month = (now.getMonth() + 1).toString()

  const { data: transactionsData } = useGetAllTransactions()
  const { data: monthTransactionData } = useGetAllTransactionsWithMonth()
  const { data: tagsData } = useGetAllTags()
  const { data: tagsWithSpendsData } = useGetAllTagsWithSpends({ month })
  const { data: amountData } = useGetRoughAmount()

  const chartData = getChartData(
    getFilteredTransactions(monthTransactionData ?? {})
  )

  const transactions = mapTransactionsToTableProps(
    transactionsData?.transactions ?? {}
  )

  const totalMonthGoal =
    (tagsData?.tags.reduce((acc, tag) => acc + tag.monthGoal, 0) ?? 0) / 100

  const totalSpends =
    (tagsWithSpendsData?.reduce((acc, tag) => acc + tag.total, 0) ?? 0) / 100

  return (
    <div className="flex flex-col flex-1 justify-center items-center md:items-start p-2">
      <header className="md:text-left text-center">
        <p className="text-dark-100 text-xl">Olá, André</p>
        <p className="text-md text-subtext-100">
          Bem vindo ao seu controle de transações
        </p>
      </header>
      <div className="flex lg:flex-row flex-col justify-center md:justify-between gap-8 mt-4 w-full">
        <Card className="flex p-4 w-full lg:w-1/2 h-80">
          <CardHeader>Gráfico de despesas</CardHeader>
          <TransactionChart chartData={chartData} />
        </Card>
        <div className="flex flex-col justify-between items-center p-4 w-full lg:w-1/2 h-80">
          <div className="flex flex-row justify-between gap-6 w-full">
            <CurrencyCard header="Meta de gastos" value={totalMonthGoal} />
            <CurrencyCard header="Gastos do mês" value={totalSpends / 100} />
          </div>
          <div className="flex flex-row justify-between gap-6 w-full">
            <CurrencyCard header="Saldo" value={(amountData ?? 0) / 100} />
            <CurrencyCard header="Gastos do mês" value={totalSpends / 100} />
          </div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <Card className="p-4 w-full h-full">
          <TransactionsTable transactions={transactions} pagination />
        </Card>
      </div>
    </div>
  )
}
