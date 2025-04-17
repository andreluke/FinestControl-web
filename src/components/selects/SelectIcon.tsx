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
import { useVirtualizedSearchList } from '@/hooks/useVirtualizedSearchList'
import { CheckIcon } from 'lucide-react'
import { DynamicIcon, type IconName, iconNames } from 'lucide-react/dynamic'
import { useState } from 'react'

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

  const { listRef, searchQuery, setSearchQuery, visibleItems, handleScroll } =
    useVirtualizedSearchList<IconName>(
      iconNames,
      (name, query) => name.toLowerCase().includes(query.toLowerCase()),
      30
    )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="inline-flex justify-between items-center bg-background hover:bg-accent px-3 py-2 border rounded-md w-[180px] text-sm cursor-pointer"
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
        style={{ overscrollBehavior: 'contain' }}
        className="z-[9999] p-0 w-[220px] max-h-[300px] overflow-auto touch-auto pointer-events-auto"
        forceMount
        asChild={false}
      >
        <Command defaultValue={defaultValue}>
          <CommandInput
            placeholder="Buscar ícone..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
          <CommandGroup>
            <div
              ref={listRef}
              onScroll={handleScroll}
              onWheel={e => e.stopPropagation()}
              className="max-h-[200px] overflow-y-auto pointer-events-auto"
            >
              {visibleItems.map(name => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={currentValue => {
                    onChange(currentValue as IconName)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center space-x-2 w-full">
                    <DynamicIcon name={name} height={20} width={20} />
                    <span className="capitalize">{name}</span>
                    {value === name && (
                      <CheckIcon
                        className="ml-auto w-4 h-4 text-primary"
                        aria-hidden="true"
                      />
                    )}
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
