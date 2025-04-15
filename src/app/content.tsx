'use client'
import { useSidebarStore } from '@/stores/useSideBarStore'
import dynamic from 'next/dynamic'
import type { JSX } from 'react'

const Dashboard = dynamic(() => import('./_components/dashboard'), {
  ssr: false,
})
const Transacao = dynamic(() => import('./_components/transacao'), {
  ssr: false,
})
const Tags = dynamic(() => import('./_components/tags'), { ssr: false })
const Pagamento = dynamic(() => import('./_components/pagamento'), {
  ssr: false,
})

const componentMap: Record<string, JSX.Element> = {
  dashboard: <Dashboard />,
  transacao: <Transacao />,
  tags: <Tags />,
  pagamento: <Pagamento />,
}

export default function Content() {
  const active = useSidebarStore(state => state.active)
  return componentMap[active] ?? <div>Página não encontrada</div>
}
