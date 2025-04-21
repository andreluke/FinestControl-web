'use client'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFnOption,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import Fuse from 'fuse.js'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { exportTableToExcel } from '@/lib/export'
import { Download } from 'lucide-react'
import { Button } from '../../ui/button'
import { DataTablePagination } from './components/data-table-pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  tableName: string
  onRowClick?: (row: TData) => void
  actionSlot?: React.ReactNode
  searchFields?: Array<keyof TData>
  searchPlaceholder?: string
  pagination?: boolean
  defaultPageSize?: number
  thresholdDefault?: number
  onSelectionChange?: (selected: TData[]) => void
  tooltipContentFn?: (row: TData) => React.ReactNode
  customExport?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  tableName,
  actionSlot,
  searchFields = [],
  searchPlaceholder = 'Filtrar...',
  pagination = true,
  defaultPageSize = 10,
  thresholdDefault = 0.5,
  onSelectionChange,
  tooltipContentFn,
  customExport,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    filterFns: {
      fuzzy: (row, _columnId, searchValue) => {
        if (!searchValue || searchFields.length === 0) return true

        const formattedRow = Object.fromEntries(
          Object.entries(row.original).map(([key, value]) => {
            if (value instanceof Date) {
              return [key, value.toLocaleDateString('pt-BR')]
            }
            return [key, value]
          })
        )

        const fuse = new Fuse([formattedRow], {
          keys: searchFields as string[],
          threshold: thresholdDefault,
        })

        const results = fuse.search(searchValue)
        return results.length > 0
      },
    },
    globalFilterFn: 'fuzzy' as FilterFnOption<TData>,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (!onSelectionChange) return

    const selectedRows = table
      .getFilteredSelectedRowModel()
      .rows.map(row => row.original)

    onSelectionChange(selectedRows)
  }, [rowSelection, onSelectionChange])

  return (
    <div>
      <div className="sticky flex justify-between items-center gap-4 py-4">
        <div className="flex items-start gap-2">{actionSlot}</div>
        <div className="flex items-end gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={event => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          {customExport ? (
            customExport
          ) : (
            <Button
              variant="outline"
              className="ml-auto cursor-pointer"
              onClick={() =>
                exportTableToExcel(table, {
                  filename: tableName,
                  excludeColumns: ['select', 'actions'],
                })
              }
            >
              <Download />
              Exportar
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto cursor-pointer">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mb-2 border border-none rounded-md max-h-[600px] overflow-auto">
        <Table className="min-w-full">
          <TableHeader className="top-0 z-10 sticky bg-background">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="top-0 z-10 sticky bg-background"
              >
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="z-10 bg-background">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => {
                const rowData = row.original

                const rowContent = (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={onRowClick ? 'cursor-pointer' : ''}
                    onClick={() => onRowClick?.(rowData)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )

                return tooltipContentFn ? (
                  <Tooltip key={row.id}>
                    <TooltipTrigger asChild>{rowContent}</TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="start"
                      className="bg-dark-500 shadow-md border-2 border-dark-200/50 text-dark-000"
                    >
                      {tooltipContentFn(rowData)}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  rowContent
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && <DataTablePagination table={table} />}
    </div>
  )
}
