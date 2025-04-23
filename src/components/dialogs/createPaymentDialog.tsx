'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Plus } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { SelectIcon } from '@/components/selects/SelectIcon'
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
import { Input } from '@/components/ui/input'

import { useCreatePaymentType } from '@/http/api'
import {
  type createPaymentData,
  createPaymentSchema,
} from '@/schemas/paymentSchema'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { IconName } from 'lucide-react/dynamic'
import { toast } from 'sonner'
import { createPaymentOnSuccess } from './api/createPaymentQuery'

export function CreatePaymentDialog() {
  const form = useForm<createPaymentData>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '' as IconName,
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createPaymentType, isPending } = useCreatePaymentType({
    mutation: {
      onSuccess: newPayment => {
        createPaymentOnSuccess(newPayment, queryClient)
        form.reset()
        closeRef.current?.click()
      },
    },
  })

  const closeRef = useRef<HTMLButtonElement>(null)

  const handleCreatePayment = async (data: createPaymentData) => {
    toast.promise(createPaymentType({ data }), {
      loading: 'Loading...',
      success: () => {
        return {
          message: 'Sua forma de pagamento foi criada com sucesso!',
          description: 'Agora você pode usar ela em suas transações.',
        }
      },
      error: error => {
        return `Erro ao criar forma de pagamento: ${error.message}`
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="flex items-center w-40 cursor-pointer"
        >
          <Plus />
          Criar pagamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pointer-events-auto">
        <DialogHeader>
          <DialogTitle>Criar forma de pagamento</DialogTitle>
          <DialogDescription>
            Crie sua forma de pagamento aqui!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreatePayment)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="items-center gap-4 grid grid-cols-4">
                  <FormLabel className="text-right">Nome</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="items-center gap-4 grid grid-cols-4">
                  <FormLabel className="text-right">Descrição</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem className="items-center gap-4 grid grid-cols-4">
                  <FormLabel className="text-right">Ícone</FormLabel>
                  <FormControl className="col-span-3">
                    <SelectIcon value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
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
                  ' Criar forma de pagamento'
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
