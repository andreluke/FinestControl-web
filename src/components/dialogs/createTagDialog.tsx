'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { useRef } from 'react'
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
import { toast } from 'sonner'
import { CurrencyInput } from '../CurrencyInput'
import { createTagOnSuccess } from './api/createTagQuery'

export function CreateTagDialog() {
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

  const { mutateAsync: createTag, isPending } = useCreateTag({
    mutation: {
      onSuccess: newTag => {
        createTagOnSuccess(newTag, queryClient)
        form.reset()
        closeRef.current?.click()
      },
    },
  })

  const handleCreateTag = async (data: createTagData) => {
    toast.promise(createTag({ data }), {
      loading: 'Loading...',
      success: () => {
        return {
          message: 'Sua tag foi criada com sucesso!',
          description: 'Agora você pode usar ela em suas transações.',
        }
      },
      error: error => {
        return `Erro ao criar tag: ${error.message}`
      },
    })
  }

  return (
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
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  'Criar tag'
                )}
              </Button>
              <DialogClose ref={closeRef} className="hidden" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
