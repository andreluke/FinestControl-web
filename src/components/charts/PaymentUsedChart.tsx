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
import type { GetMostUsedPaymentTypes200Item } from '@/http/api'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

type MostUsedPaymentTypeChartProps = {
  data: GetMostUsedPaymentTypes200Item[]
}

export function MostUsedPaymentTypeChart({
  data,
}: MostUsedPaymentTypeChartProps) {
  const chartConfig = {
    usageCount: {
      label: 'usages',
      color: '#A4F6C1',
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => {
            const words = value.split(' ') as string
            return words[words.length - 1]
          }}
        />
        <YAxis allowDecimals={false} />

        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="usageCount" fill="var(--color-usageCount)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
