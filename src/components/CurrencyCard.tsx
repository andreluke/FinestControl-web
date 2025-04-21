import NumberFlow from '@number-flow/react'
import { tv } from 'tailwind-variants'
import { Card, CardContent, CardHeader } from './ui/card'

export const currencyCardVariants = tv({
  base: 'flex flex-col gap-2 p-4 h-md',
  variants: {
    variant: {
      default: 'w-1/2 justify-center ',
      compact: 'w-auto min-w-1/5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type CurrencyCardProps = {
  value: number
  header: string
  variant?: 'default' | 'compact'
}

export function CurrencyCard({ header, value, variant }: CurrencyCardProps) {
  return (
    <Card className={currencyCardVariants({ variant })}>
      <CardHeader>{header}</CardHeader>
      <CardContent>
        {' '}
        <NumberFlow
          value={value}
          locales="pt-BR"
          format={{ style: 'currency', currency: 'BRL' }}
          className="font-bold text-dark-100 text-2xl"
        />
      </CardContent>
    </Card>
  )
}
