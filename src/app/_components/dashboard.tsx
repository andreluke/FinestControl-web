import { TransactionChart } from '@/components/charts/TransactionChart'
import { CreateTransactionDialog } from '@/components/dialogs/createTransactionDialog'
import { TransactionsTable } from '@/components/tables/TransactionTable'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getChartData, getFilteredTransactions } from '@/helpers/chartHelpers'
import { mapTransactionsToTableProps } from '@/helpers/mappers'
import {
  useGetAllTransactions,
  useGetAllTransactionsWithMonth,
  useGetRoughAmount,
} from '@/http/api'
import NumberFlow from '@number-flow/react'
import { Historic, HistoricWrapper } from './ui/historic'

export default function Dashboard() {
  const { data: transactionsData } = useGetAllTransactions({ limit: '10' })
  const { data: amountData } = useGetRoughAmount()
  const { data: monthTransactionData } = useGetAllTransactionsWithMonth()

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
          <HistoricWrapper>
            {transactions.map(item => (
              <Historic
                id={item.id}
                date={item.createdAt}
                value={item.value}
                isSpend={item.isSpend}
                key={item.id}
              />
            ))}
          </HistoricWrapper>
        </Card>
      </div>
      <div className="flex lg:flex-row flex-col justify-center gap-8 mt-4 w-full">
        <Card className="flex gap-2 w-auto min-w-1/5 h-md">
          <CardHeader>Saldo</CardHeader>
          <CardContent>
            <NumberFlow
              value={amountData ?? 0}
              locales="pt-BR"
              format={{ style: 'currency', currency: 'BRL' }}
              className="font-bold text-dark-100 text-2xl"
            />
          </CardContent>
        </Card>
        <Card className="flex gap-2 w-auto min-w-1/5 h-md">
          <CardHeader>Despesas do mês</CardHeader>
          <CardContent>
            <NumberFlow
              value={chartData[0]?.spend ?? 0}
              locales="pt-BR"
              format={{ style: 'currency', currency: 'BRL' }}
              className="font-bold text-dark-100 text-2xl"
            />
          </CardContent>
        </Card>
      </div>
      <div className="my-2 mt-4 w-full">
        <Card className="p-4 w-full h-60">
          <TransactionsTable transactions={transactions} />
        </Card>
      </div>
    </div>
  )
}
