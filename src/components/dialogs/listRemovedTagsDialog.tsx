import type { TagTableProps } from '@/@types/tables/ITagTable'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { mapTagsToTableProps } from '@/helpers/mappers'
import { useGetAllRemovedTags, useRestoreTag } from '@/http/api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { RemovedTagsTable } from '../tables/RemovedTags'
import { Button } from '../ui/button'
import { restoreTagOnSuccess } from './api/restoreTagQuery'

export function ListRemovedTagsDialog() {
  const { data } = useGetAllRemovedTags()

  const queryClient = useQueryClient()

  const { mutateAsync: restoreTag } = useRestoreTag({
    mutation: {
      onSuccess: restoredTag => {
        restoreTagOnSuccess(restoredTag, queryClient)
        // toast.success('Tag restaurada com sucesso!')
      },
      onError: error => {
        toast.error(`Erro ao restaurar tag: ${error.message}`)
      },
    },
  })

  const handleRestoreTag = async (tag: TagTableProps) => {
    const id = tag.id.toString()
    toast.promise(restoreTag({ id }), {
      loading: 'Loading...',
      success: () => {
        return 'Tag restaurada com sucesso!'
      },
      error: error => {
        return `Erro ao restaurar tag: ${error.message}`
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Listar Tags Removidas
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 w-full !max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>Lista de tags removidas</DialogTitle>
          <DialogDescription>
            Lista com todas as tags já removidas, para as restaurar basta clicar
            em "Restaurar"
          </DialogDescription>
        </DialogHeader>
        <RemovedTagsTable
          tags={mapTagsToTableProps(data?.tags ?? [])}
          onEdit={handleRestoreTag}
        />
      </DialogContent>
    </Dialog>
  )
}
