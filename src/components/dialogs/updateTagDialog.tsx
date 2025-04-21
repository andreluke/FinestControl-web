'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useUpdateTag } from '@/http/api'

import type { TagTableProps } from '@/@types/tables/ITagTable'
import { type updateTagData, updateTagSchema } from '@/schemas/tagSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { TagPopover } from '../TagPopover'
import { Input } from '../ui/input'

import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CurrencyInput } from '../CurrencyInput'
import { RemoveTagAlert } from '../alerts/removeTagAlert'
import { updateTagOnSuccess } from './api/updateTagQuery'
import { ErrorAlertDialog } from './errorDialog'

interface UpdateTagDialogProps {
  tag: TagTableProps | null
  onClose: () => void
}

export function UpdateTagDialog({ tag, onClose }: UpdateTagDialogProps) {
  const [errorOpen, setErrorOpen] = useState(false)

  const form = useForm<updateTagData>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      id: tag?.id,
      name: tag?.name,
      description: tag?.description,
      color: tag?.color,
      monthGoal: (tag?.monthGoal ?? 0) / 100,
    },
  })

  const { reset } = form

  useEffect(() => {
    if (tag) {
      reset({
        id: tag.id,
        name: tag.name,
        description: tag.description,
        color: tag.color,
        monthGoal: tag.monthGoal / 100,
      })
    }
  }, [tag, reset])

  const closeRef = useRef<HTMLButtonElement>(null)

  const queryClient = useQueryClient()

  const { mutate: updateTag, error } = useUpdateTag({
    mutation: {
      onSuccess: updateTag => {
        updateTagOnSuccess(updateTag, queryClient)
        toast.success('Sua tag foi atualizada com sucesso!', {
          description: 'Suas transações já receberam a atualização.',
        })
        form.reset()
        closeRef.current?.click()
      },
      onError: () => {
        setErrorOpen(true)
      },
    },
  })

  const handleUpdateTag = (data: updateTagData) => {
    updateTag({ data })
  }

  return (
    <>
      <Dialog open={!!tag} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Atualizar tag</DialogTitle>
            <DialogDescription>Atualize os dados da sua tag.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateTag)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => <input type="hidden" {...field} />}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da tag" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        value={Number(field.value) || 0}
                        onChange={val => field.onChange(val)}
                        onBlur={field.onBlur}
                        name={field.name}
                        id={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <TagPopover
                        selectedColor={field.value ?? ''}
                        onColorChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <RemoveTagAlert
                  id={tag?.id.toString() ?? ''}
                  onSuccessClose={onClose}
                />
                <Button type="submit" className="cursor-pointer">
                  Atualizar
                </Button>
                <DialogClose ref={closeRef} className="hidden" />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ErrorAlertDialog
        open={errorOpen}
        onOpenChange={setErrorOpen}
        errorMessage={error?.message ?? ''}
      />
    </>
  )
}
