'use client'

import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { mocksTag } from '@/mocks/TagsTableMock'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

function formatKey(name: string) {
  return name.toUpperCase().replace(/\s+/g, '-')
}

export function TagsChart() {
  const chartData = mocksTag.tags.map(tag => ({
    name: tag.name,
    [formatKey(tag.name)]: tag.id,
  }))

  const chartConfig: ChartConfig = Object.fromEntries(
    mocksTag.tags.map(tag => [
      formatKey(tag.name),
      {
        label: tag.name,
        color: tag.color,
      },
    ])
  )
  return (
    <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(chartConfig).map(key => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
