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
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

export function TransactionChart({ chartData }: TransactionChartProps) {
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
