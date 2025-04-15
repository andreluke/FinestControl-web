'use client'

import type { TransactionChartProps } from '@/@types/charts/ITransactionChart'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

export function TransactionChart({ transactions }: TransactionChartProps) {
  console.log('transactions', transactions)
  const chartData = Object.entries(transactions).map(([monthKey, data]) => {
    const date = parse(monthKey, 'yyyy-MM', new Date())
    const month = format(date, 'MMMM', { locale: ptBR })

    return {
      month: month.charAt(0).toUpperCase() + month.slice(1),
      spend: data.details.totalSpends,
      income: data.details.totalIncomes,
    }
  })

  const chartConfig = {
    spend: {
      label: 'Spend',
      color: '#9e6efe',
    },
    income: {
      label: 'Income',
      color: '#9e6efe6a',
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="spend" fill="var(--color-spend)" radius={4} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
