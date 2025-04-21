import type { SpendsTagTableProps } from '@/@types/tables/ISpendTagTable'
import {
  type DownloadTagsWithSpendsParams,
  getDownloadTagsWithSpendsUrl,
} from '@/http/api'
import { YearDropdownButton } from '../YearButton'
import { Button } from '../ui/button'
import { tagSpendsColumns } from './columns'
import { DataTable } from './ui/data-table'

export function SpendTagsTable({
  tags,
  pagination = true,
  ...props
}: SpendsTagTableProps) {
  const handleClick = (params: DownloadTagsWithSpendsParams) => {
    const url = getDownloadTagsWithSpendsUrl(params)
    window.open(url, '_blank')
  }

  return (
    <div
      className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
      {...props}
    >
      <DataTable
        columns={tagSpendsColumns}
        data={tags}
        searchFields={['id', 'name', 'color', 'monthGoal', 'total']}
        searchPlaceholder="Filtrar tags..."
        tableName="Tags"
        customExport={<YearDropdownButton onSelect={handleClick} />}
        actionSlot={<Button variant={'outline'}>Tabela de gastos</Button>}
        pagination={pagination}
      />
    </div>
  )
}
