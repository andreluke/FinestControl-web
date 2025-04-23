import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { mapPaymentTypesToTableProps } from '@/helpers/mappers'
import { useGetAllRemovedPaymentTypes, useRestorePaymentType } from '@/http/api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '../ui/button'

import type { PaymentTableProps } from '@/@types/tables/IPaymentTable'
import { RemovedPaymentTable } from '../tables/RemovedPaymentsTable'
import { restorePaymentOnSuccess } from './api/restorePaymentQuery'

export function ListRemovedPaymentDialog() {
  const { data } = useGetAllRemovedPaymentTypes()

  const queryClient = useQueryClient()

  const { mutateAsync: restorePayment, isPending } = useRestorePaymentType({
    mutation: {
      onSuccess: restoredPayment => {
        restorePaymentOnSuccess(restoredPayment, queryClient)
      },
    },
  })

  const handleRestorePayment = async (payment: PaymentTableProps) => {
    const id = payment.id.toString()
    toast.promise(restorePayment({ id }), {
      loading: 'Loading...',
      success: () => {
        return 'Forma de pagamento restaurado com sucesso!'
      },
      error: error => {
        return `Erro ao restaurar forma de pagamento: ${error.message}`
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Listar Pagamentos Removidos
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 w-full !max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>Lista de formas de pagamentos removidos</DialogTitle>
          <DialogDescription>
            Lista com todas as formas de pagamento já removidas, para as
            restaurar basta clicar em "Restaurar"
          </DialogDescription>
        </DialogHeader>
        <RemovedPaymentTable
          payments={mapPaymentTypesToTableProps(data?.paymentTypes ?? [])}
          onEdit={handleRestorePayment}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
