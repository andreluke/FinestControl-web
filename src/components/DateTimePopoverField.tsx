'use client'

import { format, formatISO } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

import { TimeCalendar } from '@/components/ui/better-calendar'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DateTimePopoverFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label: string
}

export function DateTimePopoverField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ control, name, label }: DateTimePopoverFieldProps<TFieldValues, TName>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: { field: ControllerRenderProps<TFieldValues, TName> }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start w-1/2 font-normal text-left"
                >
                  <CalendarIcon className="mr-2 w-4 h-4" />
                  {field.value
                    ? format(new Date(field.value), 'dd/MM/yyyy HH:mm:ss')
                    : 'Selecionar data e hora'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto">
                <TimeCalendar
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={date => {
                    if (date) {
                      field.onChange(formatISO(date))
                      setOpen(false)
                    } else {
                      field.onChange('')
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
