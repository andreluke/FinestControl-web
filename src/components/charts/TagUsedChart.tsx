'use client'

import * as React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import type { GetMostUsedTags200Item } from '@/http/api'

type MostUsedTagsChartProps = {
  data: GetMostUsedTags200Item[]
}

export function MostUsedTagsChart({ data }: MostUsedTagsChartProps) {
  const chartData = data.map(item => ({
    name: item.name,
    usages: item.usageCount,
    fill: item.color,
  }))

  const chartConfig = data.reduce((config, item) => {
    config[item.name] = {
      label: item.name,
      color: item.color,
    }
    return config
  }, {} as ChartConfig)

  return (
    <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="usages" radius={4}>
          {data.map(item => (
            <Cell key={item.name} fill={item.color} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
