import type { TagTableProps, TagsTableProps } from '@/@types/tables/ITagTable'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { tagColumns } from './columns'
import { DataTable } from './ui/data-table'

type RemovedTagsTableProps = TagsTableProps & {
  onEdit: (tag: TagTableProps) => void
}

export function RemovedTagsTable({
  tags,
  onEdit,
  ...props
}: RemovedTagsTableProps) {
  const [selectedTags, setSelectedTags] = useState<TagTableProps[]>([])

  const handleMultipleRestore = () => {
    for (const tag of selectedTags) {
      onEdit(tag)
    }
  }

  return (
    <div
      className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
      {...props}
    >
      <DataTable
        columns={tagColumns({
          onEdit,
          editMessage: 'Restaurar',
          selectable: true,
        })}
        data={tags}
        searchFields={['id', 'name', 'color', 'createdAt', 'updatedAt']}
        searchPlaceholder="Filtrar tags..."
        defaultPageSize={5}
        onSelectionChange={setSelectedTags}
        tableName="TagsRemovidas"
        actionSlot={
          <Button
            variant={'outline'}
            onClick={handleMultipleRestore}
            disabled={selectedTags.length === 0}
          >
            Restaurar tags selecionadas
          </Button>
        }
      />
    </div>
  )
}
