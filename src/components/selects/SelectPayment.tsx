import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAllPaymentTypes } from '@/http/api'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import * as React from 'react'

interface SelectPaymentProps {
  value: string
  onChange: (value: string) => void
  selected?: string
}

export function SelectPayment({
  value,
  onChange,
  selected,
}: SelectPaymentProps) {
  const { data } = useGetAllPaymentTypes()
  const paymentTypes = data?.paymentTypes ?? []

  return (
    <Select defaultValue={selected} value={value} onValueChange={onChange}>
      <SelectTrigger className="col-span-3 cursor-pointer">
        <SelectValue placeholder="Selecione uma forma de pagamento" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Formas de Pagamento</SelectLabel>
          {paymentTypes.map(payment => (
            <SelectItem key={payment.id} value={payment.id.toString()}>
              <DynamicIcon name={payment.icon as IconName} className="mr-2" />
              {payment.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
