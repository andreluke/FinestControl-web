'use client'

import type { PaymentTableProps } from '@/@types/tables/IPaymentTable'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useUpdatePaymentType } from '@/http/api'
import {
  type updatePaymentData,
  updatePaymentSchema,
} from '@/schemas/paymentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IconName } from 'lucide-react/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useQueryClient } from '@tanstack/react-query'
import { SelectIcon } from '../SelectIcon'
import { Input } from '../ui/input'
import { updatePaymentOnSuccess } from './api/updatePaymentQuery'
import { ErrorAlertDialog } from './errorDialog'

interface UpdatePaymentDialogProps {
  payment: PaymentTableProps | null
  onClose: () => void
}

export function UpdatePaymentDialog({
  payment,
  onClose,
}: UpdatePaymentDialogProps) {
  const [errorOpen, setErrorOpen] = useState(false)

  const form = useForm<updatePaymentData>({
    resolver: zodResolver(updatePaymentSchema),
    defaultValues: {
      id: payment?.id,
      name: payment?.name,
      description: payment?.description,
      icon: payment?.icon as IconName,
    },
  })

  const { reset } = form

  useEffect(() => {
    if (payment) {
      reset({
        id: payment.id,
        name: payment.name,
        description: payment.description,
        icon: payment.icon as IconName,
      })
    }
  }, [payment, reset])

  const closeRef = useRef<HTMLButtonElement>(null)
  const queryClient = useQueryClient()

  const { mutate: updatePaymentType, error } = useUpdatePaymentType({
    mutation: {
      onSuccess: updatePayment => {
        updatePaymentOnSuccess(updatePayment, queryClient)

        closeRef.current?.click()
      },
      onError: () => {
        setErrorOpen(true)
      },
    },
  })

  const handleUpdatePayment = (data: updatePaymentData) => {
    updatePaymentType({ data })
  }

  return (
    <>
      <Dialog open={!!payment} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Atualizar forma de pagamento</DialogTitle>
            <DialogDescription>
              Edite os dados da forma de pagamento.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdatePayment)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => <input type="hidden" {...field} />}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ícone</FormLabel>
                    <FormControl>
                      <SelectIcon
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="cursor-pointer">
                  Atualizar forma de pagamento
                </Button>
                <DialogClose ref={closeRef} className="hidden" />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ErrorAlertDialog
        open={errorOpen}
        onOpenChange={setErrorOpen}
        errorMessage={error?.message ?? ''}
      />
    </>
  )
}
