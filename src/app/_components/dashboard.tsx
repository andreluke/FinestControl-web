import { CurrencyCard } from '@/components/CurrencyCard'
import { TransactionChart } from '@/components/charts/TransactionChart'
import { TransactionsTable } from '@/components/tables/TransactionTable'
import { Card, CardHeader } from '@/components/ui/card'
import { getChartData, getFilteredTransactions } from '@/helpers/chartHelpers'
import { mapTransactionsToTableProps } from '@/helpers/mappers'
import {
  useGetAllTransactions,
  useGetAllTransactionsWithMonth,
  useGetRoughAmount,
} from '@/http/api'
import { HistoricWrapper } from './ui/historic'

export default function Dashboard() {
  const { data: transactionsData } = useGetAllTransactions({ limit: '10' })
  const { data: amountData } = useGetRoughAmount()
  const { data: monthTransactionData } = useGetAllTransactionsWithMonth()

  console.log(monthTransactionData)

  const chartData = getChartData(
    getFilteredTransactions(monthTransactionData ?? {})
  )

  const transactions = mapTransactionsToTableProps(
    transactionsData?.transactions ?? {}
  )

  return (
    <div className="flex flex-col flex-1 justify-center items-center md:items-start p-2">
      <header className="md:text-left text-center">
        <p className="text-dark-100 text-xl">Olá, André</p>
        <p className="text-md text-subtext-100">
          Bem vindo ao seu gerenciador de finanças
        </p>
      </header>
      <div className="flex lg:flex-row flex-col justify-center md:justify-between gap-8 mt-4 w-full">
        <Card className="flex p-4 w-full lg:w-1/2 h-80">
          <CardHeader>Gráfico de despesas</CardHeader>
          <TransactionChart chartData={chartData} />
        </Card>
        <Card className="flex p-4 w-full lg:w-1/2 h-80 ga-2">
          <CardHeader>Histórico de transações</CardHeader>
          <HistoricWrapper transactions={transactions} />
        </Card>
      </div>
      <div className="flex lg:flex-row flex-col justify-center gap-8 mt-4 w-full">
        <CurrencyCard
          variant="compact"
          value={(amountData ?? 0) / 100}
          header="Saldo"
        />
        <CurrencyCard
          variant="compact"
          value={chartData[chartData.length - 1]?.spend ?? 0}
          header="Despesas do mês"
        />
      </div>
      <div className="my-2 mt-4 w-full">
        <Card className="p-4 w-full h-full">
          <TransactionsTable transactions={transactions} />
        </Card>
      </div>
    </div>
  )
}
