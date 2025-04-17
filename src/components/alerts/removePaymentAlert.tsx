'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRemovePaymentType } from '@/http/api'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { removePaymentOnSuccess } from './api/removePaymentQuery'

type RemovePaymentAlertProps = {
  id: string
  onSuccessClose?: () => void
}

export function RemovePaymentAlert({
  id,
  onSuccessClose,
}: RemovePaymentAlertProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: removePaymentType } = useRemovePaymentType({
    mutation: {
      onSuccess: removedPayment => {
        removePaymentOnSuccess(removedPayment, queryClient)
        toast.warning('Seu pagamento foi removido com sucesso!', {
          description: 'Você pode recuperá-lo mais tarde.',
        })
        setOpen(false)
        onSuccessClose?.()
      },
    },
  })

  const handleRemovePayment = (id: string) => {
    removePaymentType({ id })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant={'destructive'}
          className="text-dark-500 cursor-pointer"
        >
          Remover
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você poderá recuperar essa informação mais tarde, mas não poderá
            criar transações com essa forma de pagamento até a recuperar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleRemovePayment(id)}
            className="cursor-pointer"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
