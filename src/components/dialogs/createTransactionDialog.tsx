'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
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
import { SelectPayment } from '../select/SelectPayment'
import { SelectTag } from '../select/SelectTag'
import { ErrorAlertDialog } from './errorDialog'

import { useCreateTransaction } from '@/http/api'
import {
  type createTransactionData,
  createTransactionSchema,
} from '@/schemas/transactionSchema'
import { useQueryClient } from '@tanstack/react-query'
import { createTransactionOnSuccess } from './api/createTransactionQuery'

export function CreateTransactionDialog() {
  const [errorOpen, setErrorOpen] = useState(false)

  const form = useForm<createTransactionData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: '',
      isSpend: true,
      tagId: '',
      paymentTypeId: '',
    },
  })

  const queryClient = useQueryClient()

  const closeRef = useRef<HTMLButtonElement>(null)

  const { mutate: createTransaction, error } = useCreateTransaction({
    mutation: {
      onSuccess: newTransaction => {
        createTransactionOnSuccess(newTransaction, queryClient)
        closeRef.current?.click()
      },
      onError: () => {
        setErrorOpen(true)
      },
    },
  })

  const onSubmit = (data: createTransactionData) => {
    const amount = Number(data.amount.replace(/\D/g, ''))
    createTransaction({
      data: {
        ...data,
        amount,
        tagId: Number(data.tagId),
        paymentTypeId: Number(data.paymentTypeId),
      },
    })
  }

  return (
    <>
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
                      <CurrencyInput {...field} />
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
                      <SelectTag
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Salvar alterações</Button>
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
