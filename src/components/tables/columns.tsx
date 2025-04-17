import type { PaymentTableProps } from '@/@types/tables/IPaymentTable'
import type { TagTableProps } from '@/@types/tables/ITagTable'
import type { TransactionTableProps } from '@/@types/tables/ITransactionTable'
import type { ColumnDef } from '@tanstack/react-table'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { Tag } from '../Tags'
import { DataTableColumnHeader } from './ui/data-table-header'

export const tagColumns: ColumnDef<TagTableProps>[] = [
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
    cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última atualização" />
    ),
    cell: ({ row }) =>
      row.original.updatedAt
        ? row.original.updatedAt.toLocaleDateString()
        : '---',
  },
]

export const paymentColumns: ColumnDef<PaymentTableProps>[] = [
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
    cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última atualização" />
    ),
    cell: ({ row }) =>
      row.original.updatedAt
        ? row.original.updatedAt.toLocaleDateString()
        : '---',
  },
]

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
    cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
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
