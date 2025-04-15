'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DynamicIcon, type IconName, iconNames } from 'lucide-react/dynamic'
import { useEffect, useMemo, useRef, useState } from 'react'

const BATCH_SIZE = 30

export function SelectIcon({
  value,
  onChange,
  defaultValue,
}: {
  value: IconName | null
  onChange: (value: IconName) => void
  defaultValue?: IconName
}) {
  const [open, setOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [searchQuery, setSearchQuery] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  const filteredIcons = useMemo(() => {
    return iconNames.filter(name =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const visibleIcons = filteredIcons.slice(0, visibleCount)

  const handleScroll = () => {
    const list = listRef.current
    if (list && list.scrollTop + list.clientHeight >= list.scrollHeight - 10) {
      setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filteredIcons.length))
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex justify-between items-center bg-background hover:bg-accent px-3 py-2 border rounded-md w-[180px] text-sm"
        >
          {value ? (
            <div className="flex items-center space-x-2">
              <DynamicIcon name={value} height={20} width={20} />
              <span className="capitalize">{value}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Selecionar ícone</span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="z-[9999] p-0 w-[220px] max-h-[300px] overflow-auto pointer-events-auto"
        forceMount
      >
        <Command defaultValue={defaultValue}>
          <CommandInput
            placeholder="Buscar ícone..."
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
          <CommandGroup>
            <div
              ref={listRef}
              onScroll={handleScroll}
              className="max-h-[200px] overflow-y-auto pointer-events-auto"
            >
              {visibleIcons.map(name => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={currentValue => {
                    onChange(currentValue as IconName)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <DynamicIcon name={name} height={20} width={20} />
                    <span className="capitalize">{name}</span>
                  </div>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
