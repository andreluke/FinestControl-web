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
import { useEffect, useRef } from 'react'
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
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { RemovePaymentAlert } from '../alerts/removePaymentAlert'
import { SelectIcon } from '../selects/SelectIcon'
import { Input } from '../ui/input'
import { updatePaymentOnSuccess } from './api/updatePaymentQuery'

interface UpdatePaymentDialogProps {
  payment: PaymentTableProps | null
  onClose: () => void
}

export function UpdatePaymentDialog({
  payment,
  onClose,
}: UpdatePaymentDialogProps) {
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

  const { mutateAsync: updatePaymentType, isPending } = useUpdatePaymentType({
    mutation: {
      onSuccess: updatePayment => {
        updatePaymentOnSuccess(updatePayment, queryClient)
        reset()
        closeRef.current?.click()
      },
    },
  })

  const handleUpdatePayment = async (data: updatePaymentData) => {
    toast.promise(updatePaymentType({ data }), {
      loading: 'Loading...',
      success: () => {
        return {
          message: 'Forma de pagamento atualizada com sucesso!',
          description: 'Suas transações já receberam a atualização.',
        }
      },
      error: error => {
        return `Erro ao atualizar forma de pagamento: ${error.message}`
      },
    })
  }

  return (
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
                    <SelectIcon value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <RemovePaymentAlert
                id={payment?.id.toString() ?? ''}
                onSuccessClose={onClose}
              />
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  'Atualizar'
                )}
              </Button>

              <DialogClose ref={closeRef} className="hidden" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
