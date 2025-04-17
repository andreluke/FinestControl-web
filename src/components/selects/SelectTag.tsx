import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAllTags } from '@/http/api'
import { Tag } from '../Tags'

interface SelectTagProps {
  value: string
  onChange: (value: string) => void
}

export function SelectTag({ value, onChange }: SelectTagProps) {
  const { data } = useGetAllTags()
  const tags = data?.tags ?? []

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="col-span-3 cursor-pointer">
        <SelectValue placeholder="Selecione uma tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tags </SelectLabel>
          {tags.map(tag => (
            <SelectItem key={tag.id} value={tag.id.toString()}>
              <Tag color={tag.color} name={tag.name} />
              {tag.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
