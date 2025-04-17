'use client'

import type { TagPopoverProps } from '@/@types/ITagPopover'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Palette } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'

export function TagPopover({ selectedColor, onColorChange }: TagPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="shadow-sm p-2 border-2 rounded-full w-10 cursor-pointer"
          style={{ borderColor: selectedColor }}
        >
          <Palette className="w-5 h-5" style={{ color: selectedColor }} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-dark-100 text-sm">Escolha a cor da sua tag</h1>
          <HexColorPicker color={selectedColor} onChange={onColorChange} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
