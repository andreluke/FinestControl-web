import type { TagTableProps, TagsTableProps } from '@/@types/tables/ITagTable'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'
import { Tag } from '../Tags'
import { UpdateTagDialog } from '../dialogs/updateTagDialog'

function ExibirDados(payment: TagTableProps) {
  console.table(payment)
}

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead>Última atualização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map(tg => (
              <TableRow
                onClick={() => setSelectedTag(tg)}
                key={tg.id}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{`#${tg.id}`}</TableCell>
                <TableCell>
                  <Tag color={tg.color} name={tg.name} />
                </TableCell>
                <TableCell>{tg.description}</TableCell>
                <TableCell>{tg.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  {tg.updatedAt ? tg.updatedAt.toLocaleDateString() : '---'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UpdateTagDialog tag={selectedTag} onClose={() => setSelectedTag(null)} />
    </>
  )
}
