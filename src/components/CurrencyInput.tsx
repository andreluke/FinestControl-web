'use client'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Button, Group, Input, Label, NumberField } from 'react-aria-components'

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  onBlur?: () => void
  id?: string
  name?: string
  className?: string
}

export function CurrencyInput({
  value,
  onChange,
  onBlur,
  id,
  name,
  className,
}: CurrencyInputProps) {
  return (
    <NumberField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      formatOptions={{
        style: 'currency',
        currency: 'BRL',
        currencySign: 'accounting',
      }}
    >
      <div className="*:not-first:mt-2">
        <Group className="inline-flex relative items-center shadow-xs border border-input rounded-md outline-none w-full h-9 overflow-hidden text-sm transition">
          <Input
            id={id}
            name={name}
            className={`flex-1 bg-background px-3 py-2 tabular-nums text-foreground ${className}`}
          />
          <div className="flex flex-col h-[calc(100%+2px)]">
            <Button
              slot="increment"
              className="flex flex-1 justify-center items-center bg-background hover:bg-accent -me-px border border-input w-6 h-1/2 text-muted-foreground/80 hover:text-foreground text-sm transition disabled:cursor-not-allowed"
            >
              <ChevronUpIcon size={12} aria-hidden="true" />
            </Button>
            <Button
              slot="decrement"
              className="flex flex-1 justify-center items-center bg-background hover:bg-accent -me-px -mt-px border border-input w-6 h-1/2 text-muted-foreground/80 hover:text-foreground text-sm transition disabled:cursor-not-allowed"
            >
              <ChevronDownIcon size={12} aria-hidden="true" />
            </Button>
          </div>
        </Group>
      </div>
    </NumberField>
  )
}
