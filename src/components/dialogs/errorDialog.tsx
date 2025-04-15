import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type ErrorAlertDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  errorMessage: string
}

export function ErrorAlertDialog({
  open,
  onOpenChange,
  errorMessage,
}: ErrorAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Erro ao salvar</AlertDialogTitle>
          <AlertDialogDescription>
            {errorMessage || 'Algo deu errado. Tente novamente.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
