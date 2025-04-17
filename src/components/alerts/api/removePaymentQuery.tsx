import {
  type GetAllPaymentTypes200PaymentTypesItem,
  type RemovePaymentType200,
  getGetAllPaymentTypesQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function removePaymentOnSuccess(
  removedPayment: RemovePaymentType200,
  queryClient: QueryClient
) {
  queryClient.setQueryData(
    getGetAllPaymentTypesQueryKey(),
    (oldData: unknown) => {
      const old = oldData as {
        paymentTypes: GetAllPaymentTypes200PaymentTypesItem[]
      }

      return {
        paymentTypes:
          old?.paymentTypes?.filter(
            payment => payment.id !== removedPayment.id
          ) ?? [],
      }
    }
  )
}
