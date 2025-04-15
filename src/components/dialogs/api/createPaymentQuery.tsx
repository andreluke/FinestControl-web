import {
  type CreatePaymentType201,
  type GetAllPaymentTypes200PaymentTypesItem,
  getGetAllPaymentTypesQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function createPaymentOnSuccess(
  newPayment: CreatePaymentType201,
  queryClient: QueryClient
) {
  queryClient.setQueryData(
    getGetAllPaymentTypesQueryKey(),
    (oldData: unknown) => {
      const old = oldData as {
        paymentTypes: GetAllPaymentTypes200PaymentTypesItem[]
      }

      return {
        paymentTypes: [newPayment, ...(old?.paymentTypes ?? [])],
      }
    }
  )
}
