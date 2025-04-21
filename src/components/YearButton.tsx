'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Download } from 'lucide-react'
import { useState } from 'react'

type YearDropdownButtonProps = {
  onSelect: (params: { year?: string }) => void
}

export function YearDropdownButton({ onSelect }: YearDropdownButtonProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) =>
    (2024 + i).toString()
  ).sort((a, b) => Number(b) - Number(a))

  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  )

  const handleSelect = (year: string) => {
    setSelectedYear(year)
    onSelect({ year })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download />
          Exportar tabela
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {years.map(year => (
          <DropdownMenuItem key={year} onClick={() => handleSelect(year)}>
            {year}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
