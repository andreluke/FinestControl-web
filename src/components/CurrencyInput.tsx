'use client'

import { Input } from '@/components/ui/input'
import { useCallback, useEffect } from 'react'

interface CurrencyInputProps {
  value: string
  onChange: (value: string) => void
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
  const formatCurrency = useCallback((val: string) => {
    const numeric = val.replace(/\D/g, '')
    const number = Number(numeric) / 100
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const formatted = formatCurrency(raw)
    onChange(formatted)
  }

  useEffect(() => {
    if (!value) {
      onChange(formatCurrency('0'))
    }
  }, [value, onChange, formatCurrency])

  return (
    <Input
      id={id}
      name={name}
      type="text"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      className={className}
    />
  )
}
