import { MostUsedTagsChart } from '@/components/charts/TagUsedChart'
import { GoalTagChart } from '@/components/charts/tags/GoalTagChart'
import { SpendTagsTable } from '@/components/tables/TagSpendsTable'
import { TagsTable } from '@/components/tables/TagTable'
import { Card, CardHeader } from '@/components/ui/card'
import { mapTagsToTableProps } from '@/helpers/mappers'
import {
  useGetAllTags,
  useGetAllTagsWithSpends,
  useGetMostUsedTags,
} from '@/http/api'

export default function Pagamento() {
  const now = new Date()
  const month = (now.getMonth() + 1).toString()
  const { data } = useGetAllTags()
  const { data: mostUsedTagsData } = useGetMostUsedTags({ limit: '5' })
  const { data: tagsWithSpendsData } = useGetAllTagsWithSpends({ month })

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
          <MostUsedTagsChart data={mostUsedTagsData ?? []} />
        </Card>
        <Card className="flex px-4 w-full lg:w-1/2 h-80">
          <CardHeader>Tags e seus gastos</CardHeader>
          <GoalTagChart data={tagsWithSpendsData ?? []} />
        </Card>
      </div>
      <div className="my-2 mt-4 w-full">
        <Card className="p-4 w-full h-full">
          <TagsTable tags={mapTagsToTableProps(data?.tags ?? [])} />
        </Card>
      </div>
      <div className="my-2 mt-4 w-full">
        <Card className="p-4 w-full h-full">
          <SpendTagsTable tags={tagsWithSpendsData ?? []} />
        </Card>
      </div>
    </div>
  )
}
