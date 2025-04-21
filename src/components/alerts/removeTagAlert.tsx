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
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { removeTagOnSuccess } from './api/removeTagQuery'

type RemoveTagAlertProps = {
  id: string
  onSuccessClose?: () => void
  asDropdownItem?: boolean
}

export function RemoveTagAlert({
  id,
  onSuccessClose,
  asDropdownItem,
}: RemoveTagAlertProps) {
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

  const handleRemoveTag = () => {
    removeTag({ id })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {asDropdownItem ? (
          <DropdownMenuItem
            onSelect={e => {
              e.preventDefault()
              setOpen(true)
            }}
            className="cursor-pointer"
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Remover
          </DropdownMenuItem>
        ) : (
          <Button
            type="button"
            variant="destructive"
            className="text-dark-500 cursor-pointer"
          >
            Remover
          </Button>
        )}
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
            onClick={handleRemoveTag}
            className="cursor-pointer"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
