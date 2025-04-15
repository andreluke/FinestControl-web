import type {
  HistoricParams,
  HistoricWrapperParams,
} from '@/@types/components/IHistoric'
import { Label, LabelText } from '@/components/Label'
import { CardContent } from '@/components/ui/card'

export function Historic({ id, date, value, isSpend }: HistoricParams) {
  const validDate = date instanceof Date && !Number.isNaN(date.getTime())
  return (
    <CardContent>
      <Label>
        <LabelText>
          {validDate ? date.toLocaleDateString() : 'Data inválida'}
        </LabelText>
        <LabelText>
          {' '}
          {`R$ ${isSpend ? '-' : '+'}${(value / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </LabelText>
      </Label>
    </CardContent>
  )
}

export function HistoricWrapper({ ...props }: HistoricWrapperParams) {
  return (
    <div
      {...props}
      className={'overflow-y-auto max-h-full space-y-3  scrollbar'}
    >
      {props.children}
    </div>
  )
}
