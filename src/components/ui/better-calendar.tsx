'use client'

import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClockIcon } from 'lucide-react'
import { useId } from 'react'

interface TimeCalendarProps {
  value?: Date
  onChange: (date?: Date) => void
}

export function TimeCalendar({ value, onChange }: TimeCalendarProps) {
  const id = useId()

  return (
    <div className="border rounded-md">
      <Calendar
        mode="single"
        className="p-2"
        selected={value}
        onSelect={onChange}
      />
      <div className="p-3 border-t">
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="text-xs">
            Horário
          </Label>
          <div className="relative grow">
            <Input
              id={id}
              type="time"
              step="1"
              value={value ? value.toTimeString().slice(0, 8) : ''}
              onChange={e => {
                if (!value) return
                const [hours, minutes, seconds] = e.target.value.split(':')
                const newDate = new Date(value)
                newDate.setHours(+hours)
                newDate.setMinutes(+minutes)
                newDate.setSeconds(+seconds)
                onChange(newDate)
              }}
              className="peer [&::-webkit-calendar-picker-indicator]:hidden ps-9 appearance-none"
            />
            <div className="absolute inset-y-0 flex justify-center items-center ps-3 text-muted-foreground/80 pointer-events-none start-0">
              <ClockIcon size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
