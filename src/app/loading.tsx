import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex justify-center items-center p-4 h-full">
      <Loader2 className="w-6 h-6 text-brand-100 animate-spin" />
    </div>
  )
}
