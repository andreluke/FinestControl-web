'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { Button } from '@/components/ui/button'
import type { GetAllTagsWithSpends200Item } from '@/http/api'

type GoalTagsChartProps = {
  data: GetAllTagsWithSpends200Item[]
}

const ITEMS_PER_PAGE = 5

function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function GoalTagChart({ data }: GoalTagsChartProps) {
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const paginatedData = data.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  const chartData = paginatedData.map(item => ({
    name: item.name,
    goal: item.monthGoal / 100,
    total: item.total / 100,
    color: item.color,
    transparentColor: hexToRgba(item.color, 0.5),
  }))

  const chartConfig = paginatedData.reduce((config, item) => {
    config[item.name] = {
      label: item.name,
      color: item.color,
    }
    return config
  }, {} as ChartConfig)

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="w-full h-46">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="goal" name="Meta" radius={4}>
              {chartData.map(entry => (
                <Cell
                  key={`goal-${entry.name}`}
                  fill={entry.color}
                  color={entry.color}
                />
              ))}
            </Bar>
            <Bar dataKey="total" name="Gasto" radius={4}>
              {chartData.map(entry => (
                <Cell
                  key={`total-${entry.name}`}
                  fill={entry.transparentColor}
                  color={entry.transparentColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex justify-end items-center gap-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Anterior
        </Button>
        <span className="text-sm">
          Página {page + 1} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
