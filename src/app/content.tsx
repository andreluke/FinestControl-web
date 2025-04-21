'use client'

import { useSidebarStore } from '@/stores/useSideBarStore'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { JSX } from 'react'
import Loading from './loading'

const Dashboard = dynamic(() => import('./_components/dashboard'), {
  ssr: true,
})
const Transacao = dynamic(() => import('./_components/transactions'), {
  ssr: true,
})
const Tags = dynamic(() => import('./_components/tags'), { ssr: true })
const Pagamento = dynamic(() => import('./_components/payments'), {
  ssr: true,
})

const componentMap: Record<string, JSX.Element> = {
  dashboard: <Dashboard />,
  transacao: <Transacao />,
  tags: <Tags />,
  pagamento: <Pagamento />,
}

export default function Content() {
  const active = useSidebarStore(state => state.active)

  return (
    <Suspense fallback={<Loading />}>
      {componentMap[active] ?? <div className="p-4">Página não encontrada</div>}
    </Suspense>
  )
}
