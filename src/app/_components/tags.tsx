import { CreateTagDialog } from '@/components/dialogs/createTagDialog'
import { TagsTable } from '@/components/tables/TagTable'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { mapTagsToTableProps } from '@/helpers/mappers'
import { useGetAllTags } from '@/http/api'

export default function Pagamento() {
  const { data } = useGetAllTags()
  return (
    <div className="flex flex-col flex-1 justify-center items-center md:items-start p-2">
      <header className="md:text-left text-center">
        <p className="text-dark-100 text-xl">Olá, André</p>
        <p className="text-md text-subtext-100">
          Bem vindo ao seu controle de tags
        </p>
      </header>
      <div className="flex lg:flex-row flex-col justify-center md:justify-between gap-8 mt-4 w-full">
        <Card className="flex p-4 w-full lg:w-1/2 h-80">
          <CardHeader>Tags mais usadas</CardHeader>
        </Card>
        <div className="flex flex-col justify-between p-4 w-full lg:w-1/2 h-80">
          <Card className="flex gap-3 p-4 w-full h-30 ga-2">
            <CardHeader>Cadastrar tag</CardHeader>
            <CardContent>
              <CreateTagDialog />
            </CardContent>
          </Card>
          <Card className="flex p-4 w-full h-30 ga-2">
            <CardHeader>Lista de formas de tags removidas</CardHeader>
          </Card>
        </div>
      </div>
      <div className="my-2 mt-4 w-full">
        <Card className="p-4 w-full h-60">
          <TagsTable tags={mapTagsToTableProps(data?.tags ?? [])} />
        </Card>
      </div>
    </div>
  )
}
