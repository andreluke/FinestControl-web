import type { ComponentProps } from 'react'

export interface HistoricParams {
  id: number
  date: Date
  value: number
  isSpend: boolean
}

export interface HistoricWrapperParams extends ComponentProps<'div'> {}
