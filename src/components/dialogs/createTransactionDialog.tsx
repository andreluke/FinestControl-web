'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { CurrencyInput } from '../CurrencyInput'
import { SelectPayment } from '../selects/SelectPayment'
import { SelectTag } from '../selects/SelectTag'

import { useCreateTransaction } from '@/http/api'
import {
  type createTransactionData,
  createTransactionSchema,
} from '@/schemas/transactionSchema'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { DateTimePopoverField } from '../DateTimePopoverField'
import { createTransactionOnSuccess } from './api/createTransactionQuery'

export function CreateTransactionDialog() {
  const form = useForm<createTransactionData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: 0,
      isSpend: true,
      tagId: '',
      paymentTypeId: '',
    },
  })

  const queryClient = useQueryClient()

  const closeRef = useRef<HTMLButtonElement>(null)

  const { mutateAsync: createTransaction, isPending } = useCreateTransaction({
    mutation: {
      onSuccess: newTransaction => {
        createTransactionOnSuccess(newTransaction, queryClient)
        form.reset()
        closeRef.current?.click()
      },
    },
  })

  const onSubmit = async (data: createTransactionData) => {
    toast.promise(
      createTransaction({
        data: {
          ...data,
          tagId: Number(data.tagId),
          paymentTypeId: Number(data.paymentTypeId),
        },
      }),
      {
        loading: 'Loading...',
        success: () => {
          return {
            message: 'Transação criada com sucesso!',
            description: 'Seu saldo já foi alterado.',
          }
        },
        error: error => {
          return `Erro ao restaurar forma de pagamento: ${error.message}`
        },
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center w-40 cursor-pointer"
        >
          <Plus />
          Criar transação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar transação</DialogTitle>
          <DialogDescription>Cadastre sua transação aqui!</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={Number(field.value) || 0}
                      onChange={val => field.onChange(val)}
                      onBlur={field.onBlur}
                      name={field.name}
                      id={field.name}
                      aria-label="Valor"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isSpend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gasto?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagamento</FormLabel>
                  <FormControl>
                    <SelectPayment
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <SelectTag value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DateTimePopoverField
              control={form.control}
              name="createdAt"
              label="Data e hora"
            />

            <DialogFooter>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  'Criar transação'
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
