import {
  type GetAllTags200TagsItem,
  type RestoreTag200,
  getGetAllRemovedTagsQueryKey,
  getGetAllTagsQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function restoreTagOnSuccess(
  restoredTag: RestoreTag200,
  queryClient: QueryClient
) {
  queryClient.setQueryData(
    getGetAllRemovedTagsQueryKey(),
    (oldData: unknown) => {
      const old = oldData as { tags: GetAllTags200TagsItem[] }

      console.log(old)

      return {
        tags: old?.tags?.filter(tag => tag.id !== restoredTag.id) ?? [],
      }
    }
  )

  queryClient.setQueryData(getGetAllTagsQueryKey(), (oldData: unknown) => {
    const old = oldData as { tags: GetAllTags200TagsItem[] }

    return {
      tags: [restoredTag, ...(old?.tags ?? [])],
    }
  })
}
