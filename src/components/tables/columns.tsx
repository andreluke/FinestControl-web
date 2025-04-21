import type { PaymentTableProps } from '@/@types/tables/IPaymentTable'
import type { SpendTagTableProps } from '@/@types/tables/ISpendTagTable'
import type { TagTableProps } from '@/@types/tables/ITagTable'
import type { TransactionTableProps } from '@/@types/tables/ITransactionTable'
import NumberFlow from '@number-flow/react'
import type { ColumnDef } from '@tanstack/react-table'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { Tag } from '../Tags'
import { Checkbox } from '../ui/checkbox'
import { createActionsColumn } from './ui/components/actionsTable'
import { DataTableColumnHeader } from './ui/components/data-table-header'

type tagColumnsProps = {
  onEdit?: (tag: TagTableProps) => void
  editMessage?: string
  deleteTrigger?: (tag: TagTableProps) => React.ReactNode
  selectable?: boolean
}

type paymentColumnsProps = {
  onEdit?: (payment: PaymentTableProps) => void
  editMessage?: string
  deleteTrigger?: (payment: PaymentTableProps) => React.ReactNode
  selectable?: boolean
}

export const tagColumns = ({
  onEdit,
  editMessage,
  deleteTrigger,
  selectable,
}: tagColumnsProps): ColumnDef<TagTableProps>[] => {
  const columns: ColumnDef<TagTableProps>[] = []

  if (selectable) {
    columns.push({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar tudo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label={`Selecionar linha ${row.index + 1}`}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    })
  }

  columns.push(
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{`#${row.original.id}`}</span>
      ),
    },
    {
      accessorKey: 'tag',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tag" />
      ),
      cell: ({ row }) => (
        <Tag color={row.original.color} name={row.original.name} />
      ),
    },
    {
      accessorKey: 'monthGoal',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Meta" />
      ),
      cell: ({ row }) => {
        const { monthGoal } = row.original
        const formatted = (monthGoal / 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        return <div>{`R$ ${formatted}`}</div>
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descrição" />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de criação" />
      ),
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Última atualização" />
      ),
      cell: ({ row }) =>
        row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '---',
    },
    createActionsColumn<TagTableProps>({
      onEdit,
      deleteTrigger,
      header: 'Ações',
      editMessage,
    })
  )

  return columns
}

export const paymentColumns = ({
  onEdit,
  deleteTrigger,
  editMessage,
  selectable,
}: paymentColumnsProps): ColumnDef<PaymentTableProps>[] => {
  const columns: ColumnDef<PaymentTableProps>[] = []

  if (selectable) {
    columns.push({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar tudo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label={`Selecionar linha ${row.index + 1}`}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    })
  }

  columns.push(
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{`#${row.original.id}`}</span>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
    },
    {
      accessorKey: 'icon',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Icon" />
      ),
      cell: ({ row }) => <DynamicIcon name={row.original.icon as IconName} />,
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descrição" />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de criação" />
      ),
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Última atualização" />
      ),
      cell: ({ row }) =>
        row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '---',
    },
    createActionsColumn<PaymentTableProps>({
      onEdit,
      deleteTrigger,
      editMessage,
      header: 'Ações',
    })
  )

  return columns
}

export const transactionColumns: ColumnDef<TransactionTableProps>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{`#${row.original.id}`}</span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de criação" />
    ),
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
  },
  {
    accessorKey: 'paymentIcon',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pagamento" />
    ),
    cell: ({ row }) => (
      <DynamicIcon name={row.original.paymentIcon as IconName} />
    ),
  },
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
    ),
    cell: ({ row }) => (
      <Tag name={row.original.tagName} color={row.original.tagColor} />
    ),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Valor" />
      </div>
    ),
    cell: ({ row }) => {
      const { value, isSpend } = row.original
      const formatted = (value / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      return <div>{`R$ ${isSpend ? '-' : '+'}${formatted}`}</div>
    },
  },
]

export const tagSpendsColumns: ColumnDef<SpendTagTableProps>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{`#${row.original.id}`}</span>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
    ),
    cell: ({ row }) => (
      <Tag color={row.original.color} name={row.original.name} />
    ),
  },
  {
    accessorKey: 'monthGoal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meta" />
    ),
    cell: ({ row }) => (
      <NumberFlow
        value={row.original.monthGoal / 100}
        locales="pt-BR"
        format={{ style: 'currency', currency: 'BRL' }}
        className="font-bold text-dark-100"
      />
    ),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <NumberFlow
        value={row.original.total / 100}
        locales="pt-BR"
        format={{ style: 'currency', currency: 'BRL' }}
        className="font-bold text-dark-100"
      />
    ),
  },
  {
    accessorKey: 'passed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Conforme?" />
    ),
    cell: ({ row }) => {
      const { monthGoal, total } = row.original
      const passed = monthGoal > total
      return (
        <span className="text-center">
          {passed ? (
            <DynamicIcon name="check" className="text-pass-100" />
          ) : (
            <DynamicIcon name="x" className="text-danger-100" />
          )}
        </span>
      )
    },
  },
]
