import {
  type GetAllTags200TagsItem,
  type RemoveTag200,
  getGetAllRemovedTagsQueryKey,
  getGetAllTagsQueryKey,
} from '@/http/api'
import type { QueryClient } from '@tanstack/react-query'

export function removeTagOnSuccess(
  removedTag: RemoveTag200,
  queryClient: QueryClient
) {
  queryClient.setQueryData(getGetAllTagsQueryKey(), (oldData: unknown) => {
    const old = oldData as { tags: GetAllTags200TagsItem[] }

    console.log(old)

    return {
      tags: old?.tags?.filter(tag => tag.id !== removedTag.id) ?? [],
    }
  })

  queryClient.setQueryData(
    getGetAllRemovedTagsQueryKey(),
    (oldData: unknown) => {
      const old = oldData as { tags: GetAllTags200TagsItem[] }

      return {
        tags: [removedTag, ...(old?.tags ?? [])],
      }
    }
  )
}
