import { ScreenSizeDebug } from '@/debug/Breakpoint'
import { InitSidebarFromSearchParams } from '@/hooks/SideBarParams'
import { Suspense } from 'react'
import Content from './content'
import Loading from './loading'
import { SideBar } from './sidebar'

export default function Home() {
  return (
    <div className="flex">
      <Suspense fallback={<Loading />}>
        <InitSidebarFromSearchParams />
        <div className="hidden lg:block w-1/6" />
        <ScreenSizeDebug />

        <SideBar />
        <main className="flex-1 p-4">
          <Content />
        </main>
      </Suspense>
    </div>
  )
}
