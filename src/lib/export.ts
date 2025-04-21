import type { Table } from '@tanstack/react-table'
import * as XLSX from 'xlsx-js-style'

interface ExportExcelOptions<TData> {
  filename?: string
  excludeColumns?: (keyof TData | 'select' | 'actions')[]
  onlySelected?: boolean
}

export function exportTableToExcel<TData>(
  table: Table<TData>,
  opts: ExportExcelOptions<TData> = {}
): void {
  const { filename = 'table', excludeColumns = [], onlySelected = false } = opts

  const leafColumns = table
    .getAllLeafColumns()
    .filter(
      col =>
        !excludeColumns.includes(col.id as keyof TData | 'select' | 'actions')
    )

  const headerLabels = leafColumns.map(col =>
    typeof col.columnDef.header === 'function'
      ? col.id
      : String(col.columnDef.header ?? col.id)
  )

  const rows = (
    onlySelected
      ? table.getFilteredSelectedRowModel().rows
      : table.getRowModel().rows
  ).map(row => leafColumns.map(col => row.getValue(col.id)))

  const sheetData: XLSX.CellObject[][] = []

  const headerRow = headerLabels.map(label => ({
    v: label,
    t: 's',
    s: {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { rgb: 'C6EFCE' },
      },
      font: {
        bold: true,
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center',
      },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
      },
    },
  }))
  sheetData.push(headerRow as XLSX.CellObject[])

  for (const row of rows) {
    const styledRow = row.map(value => {
      const isNumber = typeof value === 'number' && Number.isFinite(value)

      if (isNumber) {
        return {
          v: value / 100,
          t: 'n' as XLSX.ExcelDataType,
          z: '"R$"#,##0.00',
          s: {
            alignment: { horizontal: 'right' },
          },
        } as XLSX.CellObject
      }

      return {
        v:
          value == null
            ? ''
            : typeof value === 'object'
              ? JSON.stringify(value)
              : String(value),
        t: 's' as XLSX.ExcelDataType,
      } as XLSX.CellObject
    })

    sheetData.push(styledRow as XLSX.CellObject[])
  }

  // Converte os dados com estilo para sheet
  const worksheet = XLSX.utils.sheet_add_aoa(
    XLSX.utils.book_new().Sheets.Data || {},
    [],
    {
      origin: 'A1',
    }
  )
  sheetData.forEach((row, r) => {
    row.forEach((cell, c) => {
      const address = XLSX.utils.encode_cell({ r, c })
      worksheet[address] = cell
    })
  })

  worksheet['!ref'] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: sheetData.length - 1, c: headerLabels.length - 1 },
  })

  worksheet['!autofilter'] = {
    ref: XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: 0, c: headerLabels.length - 1 },
    }),
  }
  worksheet['!cols'] = leafColumns.map(() => ({ wch: 20 }))

  const workbook: XLSX.WorkBook = {
    Sheets: { Data: worksheet },
    SheetNames: ['Data'],
  }

  XLSX.writeFile(workbook, `${filename}.xlsx`)
}
