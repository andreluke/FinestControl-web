import type { TagTableProps, TagsTableProps } from '@/@types/tables/ITagTable'
import React from 'react'
import { CreateTagDialog } from '../dialogs/createTagDialog'
import { UpdateTagDialog } from '../dialogs/updateTagDialog'
import { tagColumns } from './columns'
import { DataTable } from './ui/data-table'

export function TagsTable({ tags, ...props }: TagsTableProps) {
  const [selectedTag, setSelectedTag] = React.useState<TagTableProps | null>(
    null
  )

  return (
    <>
      <div
        className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
        {...props}
      >
        <DataTable
          columns={tagColumns}
          data={tags}
          onRowClick={setSelectedTag}
          actionSlot={<CreateTagDialog />}
          searchFields={['id', 'name', 'color', 'createdAt', 'updatedAt']}
        />
      </div>
      <UpdateTagDialog tag={selectedTag} onClose={() => setSelectedTag(null)} />
    </>
  )
}
