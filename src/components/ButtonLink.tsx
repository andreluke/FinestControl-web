import type { ButtonLinkProps } from '@/@types/IButton'
import { DynamicIcon } from 'lucide-react/dynamic'

export function ButtonLink({ name, alt, ...props }: ButtonLinkProps) {
  return (
    <>
      <DynamicIcon height={30} name={name} />
      <span
        className="md:hidden lg:inline max-w-full overflow-hidden sm:text-sm md:text-lg truncate text-ellipsis whitespace-nowrap"
        {...props}
      >
        {props.children}
      </span>
    </>
  )
}
