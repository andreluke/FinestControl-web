import type {
  TransactionTableProps,
  TransactionsTableProps,
} from '@/@types/tables/ITransactionTable'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { Tag } from '../Tags'

function ExibirDados(transaction: TransactionTableProps) {
  console.table(transaction)
}

export function TransactionsTable({
  transactions,
  ...props
}: TransactionsTableProps) {
  return (
    <div
      className="max-w-full max-h-md overflow-y-auto scrollbar-thin"
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Data de criação</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(tx => (
            <TableRow
              className="cursor-pointer"
              key={tx.id}
              onClick={() => ExibirDados(tx)}
            >
              <TableCell className="font-medium">{`#${tx.id}`}</TableCell>
              <TableCell>{tx.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <DynamicIcon name={tx.paymentIcon as IconName} />
              </TableCell>
              <TableCell>
                <Tag name={tx.tagName} color={tx.tagColor} />
              </TableCell>
              <TableCell className="text-right">
                {`R$ ${tx.isSpend ? '-' : '+'}${(tx.value / 100).toLocaleString(
                  'pt-BR',
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
