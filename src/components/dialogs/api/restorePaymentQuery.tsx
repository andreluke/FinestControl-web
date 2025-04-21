import {
  type GetAllPaymentTypes200PaymentTypesItem,
  type RestorePaymentType200,
  getGetAllPaymentTypesQueryKey,
  getGetAllRemovedPaymentTypesQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function restorePaymentOnSuccess(
  restoredPayment: RestorePaymentType200,
  queryClient: QueryClient
) {
  queryClient.setQueryData(
    getGetAllRemovedPaymentTypesQueryKey(),
    (oldData: unknown) => {
      const old = oldData as {
        paymentTypes: GetAllPaymentTypes200PaymentTypesItem[]
      }

      return {
        paymentTypes:
          old?.paymentTypes?.filter(
            payment => payment.id !== restoredPayment.id
          ) ?? [],
      }
    }
  )

  queryClient.setQueryData(
    getGetAllPaymentTypesQueryKey(),
    (oldData: unknown) => {
      const old = oldData as {
        paymentTypes: GetAllPaymentTypes200PaymentTypesItem[]
      }

      return {
        paymentTypes: [restoredPayment, ...(old?.paymentTypes ?? [])],
      }
    }
  )
}
