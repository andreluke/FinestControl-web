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
import { useRemoveTag } from '@/http/api'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { removeTagOnSuccess } from './api/removeTagQuery'

type RemoveTagAlertProps = {
  id: string
  onSuccessClose?: () => void
}

export function RemoveTagAlert({ id, onSuccessClose }: RemoveTagAlertProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: removeTag } = useRemoveTag({
    mutation: {
      onSuccess: removedTag => {
        removeTagOnSuccess(removedTag, queryClient)
        toast.warning('Sua tag foi removida com sucesso!', {
          description: 'Você pode recuperá-la mais tarde.',
        })
        setOpen(false)
        onSuccessClose?.()
      },
    },
  })

  const handleRemoveTag = (id: string) => {
    removeTag({ id })
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
            criar transações com essa tag até a recuperar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleRemoveTag(id)}
            className="cursor-pointer"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
