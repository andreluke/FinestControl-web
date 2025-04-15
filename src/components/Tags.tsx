import type { TagParams } from '@/@types/ITag'
import { Badge } from './ui/badge'

export function Tag({ name, color }: TagParams) {
  return (
    <Badge style={{ borderColor: color, color: color }} variant={'outline'}>
      {name}
    </Badge>
  )
}
