import type { TagTableProps, TagsTableProps } from '@/@types/tables/ITagTable'
import { Button } from '@/components/ui/button'
import React from 'react'
import { RemoveTagAlert } from '../alerts/removeTagAlert'
import { CreateTagDialog } from '../dialogs/createTagDialog'
import { ListRemovedTagsDialog } from '../dialogs/listRemovedTagsDialog'
import { UpdateTagDialog } from '../dialogs/updateTagDialog'
import { tagColumns } from './columns'
import { DataTable } from './ui/data-table'

export function TagsTable({ tags, ...props }: TagsTableProps) {
  const [selectedTag, setSelectedTag] = React.useState<TagTableProps | null>(
    null
  )

  const onEdit = (tag: TagTableProps) => {
    setSelectedTag(tag)
  }

  const deleteTrigger = (tag: TagTableProps) => (
    <RemoveTagAlert
      id={tag.id.toString()}
      onSuccessClose={() => {}}
      asDropdownItem
    />
  )

  return (
    <>
      <div
        className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
        {...props}
      >
        <DataTable
          columns={tagColumns({ onEdit, deleteTrigger })}
          data={tags}
          actionSlot={
            <>
              <CreateTagDialog />
              <ListRemovedTagsDialog />
            </>
          }
          searchFields={['id', 'name', 'color', 'createdAt', 'updatedAt']}
          searchPlaceholder="Filtrar tags..."
          tableName="Tags"
        />
      </div>
      <UpdateTagDialog tag={selectedTag} onClose={() => setSelectedTag(null)} />
    </>
  )
}
