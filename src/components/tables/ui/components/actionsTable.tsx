import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { DataTableColumnHeader } from './data-table-header'

interface ActionsColumnProps<T> {
  onEdit?: (item: T) => void
  deleteTrigger?: (item: T) => React.ReactNode
  header?: string
  editMessage?: string
}

export function createActionsColumn<T>({
  onEdit,
  deleteTrigger,
  header,
  editMessage,
}: ActionsColumnProps<T>): ColumnDef<T> {
  return {
    id: 'actions',
    header: ({ column }) =>
      header ? <DataTableColumnHeader column={column} title={header} /> : null,
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="!cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-10">
            {onEdit && (
              <DropdownMenuItem
                onClick={() => onEdit(item)}
                className="!cursor-pointer"
              >
                <Pencil className="mr-2 w-4 h-4" />
                {editMessage ?? 'Editar'}
              </DropdownMenuItem>
            )}
            {deleteTrigger?.(item)}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}
