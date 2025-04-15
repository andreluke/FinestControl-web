'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { TagPopover } from '../TagPopover'
import { ErrorAlertDialog } from './errorDialog'

import { type createTagData, createTagSchema } from '@/schemas/tagSchema'

import { useCreateTag } from '@/http/api'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useQueryClient } from '@tanstack/react-query'
import { createTagOnSuccess } from './api/createTagQuery'

export function CreateTagDialog() {
  const [errorOpen, setErrorOpen] = useState(false)

  const form = useForm<createTagData>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#000000',
    },
  })

  const queryClient = useQueryClient()

  const closeRef = useRef<HTMLButtonElement>(null)

  const { mutate: createTag, error } = useCreateTag({
    mutation: {
      onSuccess: newTag => {
        createTagOnSuccess(newTag, queryClient)
        closeRef.current?.click()
      },
      onError: () => {
        setErrorOpen(true)
      },
    },
  })

  const handleCreateTag = (data: createTagData) => {
    createTag({ data })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center w-30 cursor-pointer"
          >
            <Plus />
            Criar Tag
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Criar tag</DialogTitle>
            <DialogDescription>Crie sua nova tag aqui!</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateTag)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="items-center gap-4 grid grid-cols-4">
                    <FormLabel className="text-right">Nome</FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="items-center gap-4 grid grid-cols-4">
                    <FormLabel className="text-right">Descrição</FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="items-center gap-4 grid grid-cols-4">
                    <FormLabel className="text-right">Cor</FormLabel>
                    <FormControl className="col-span-3">
                      <TagPopover
                        selectedColor={field.value}
                        onColorChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-2" />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="cursor-pointer">
                  Criar tag
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
