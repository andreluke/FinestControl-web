import type {
  ErrorMessageProps,
  ErrorMessageTextProps,
} from '@/@types/IErrorMessage'
import { TriangleAlert } from 'lucide-react'

export function ErrorMessage({ ...props }: ErrorMessageProps) {
  return (
    <div className="col-span-4" {...props}>
      {props.children}
    </div>
  )
}

export function ErrorMessageText({ ...props }: ErrorMessageTextProps) {
  return (
    <span
      className="flex flex-row items-center gap-2 font-medium text-danger-100 text-xs"
      {...props}
    >
      <TriangleAlert size={15} style={{ color: 'red' }} />

      {props.children}
    </span>
  )
}
