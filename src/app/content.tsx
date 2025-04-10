'use client'
import { useSidebarStore } from '@/stores/useSideBarStore'
import Dashboard from './_components/dashboard'
import Pagamento from './_components/pagamento'
import Tags from './_components/tags'
import Transacao from './_components/transacao'

export default function Content() {
  const active = useSidebarStore(state => state.active)

  switch (active) {
    case 'dashboard':
      return <Dashboard />
    case 'transacao':
      return <Transacao />
    case 'tags':
      return <Tags />
    case 'pagamento':
      return <Pagamento />
    default:
      return <div>Página não encontrada</div>
  }
}
