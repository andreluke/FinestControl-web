import {
  type CreateTag201,
  type GetAllTags200TagsItem,
  getGetAllTagsQueryKey,
} from '@/http/api'
import { useQueryClient } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'

export function createTagOnSuccess(
  newTag: CreateTag201,
  queryClient: QueryClient
) {
  queryClient.setQueryData(getGetAllTagsQueryKey(), (oldData: unknown) => {
    const old = oldData as { tags: GetAllTags200TagsItem[] }

    return {
      tags: [newTag, ...(old?.tags ?? [])],
    }
  })
}
