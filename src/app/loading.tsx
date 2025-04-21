import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="z-100 flex justify-center items-center w-screen h-screen">
      <Loader2 className="w-40 h-40 text-brand-100 animate-spin" />
    </div>
  )
}
