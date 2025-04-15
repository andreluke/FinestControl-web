import type { LabelProps, LabelTextProps } from '@/@types/ILabel'

export function Label({ ...props }: LabelProps) {
  return (
    <div className="flex justify-between items-center bg-brand-100/20 p-2 rounded-lg">
      {props.children}
    </div>
  )
}

export function LabelText({ ...props }: LabelTextProps) {
  return (
    <span className="font-medium text-brand-100 text-sm" {...props}>
      {props.children}
    </span>
  )
}
