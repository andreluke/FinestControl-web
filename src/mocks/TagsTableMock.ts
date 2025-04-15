import type { TagsTableProps } from '@/@types/tables/ITagTable'

export const mocksTag: TagsTableProps = {
  tags: [
    {
      id: 1,
      name: 'Urgente',
      description: 'Tarefas que precisam ser feitas com urgência.',
      color: '#FF5733',
      criadoEm: new Date('2023-03-01T10:00:00Z'),
      atualizadoEm: new Date('2023-04-01T15:30:00Z'),
    },
    {
      id: 2,
      name: 'Importante',
      description: 'Tarefas com alta prioridade.',
      color: '#FFC300',
      criadoEm: new Date('2023-02-15T09:00:00Z'),
      atualizadoEm: null,
    },
    {
      id: 3,
      name: 'Baixa Prioridade',
      description: 'Tarefas com prioridade baixa.',
      color: '#DAF7A6',
      criadoEm: new Date('2023-01-10T14:45:00Z'),
      atualizadoEm: new Date('2023-03-05T16:00:00Z'),
    },
    {
      id: 4,
      name: 'Reuniões',
      description: 'Eventos relacionados a reuniões e encontros.',
      color: '#900C3F',
      criadoEm: new Date('2023-04-01T12:00:00Z'),
      atualizadoEm: new Date('2023-04-10T10:00:00Z'),
    },
    {
      id: 5,
      name: 'Desenvolvimento',
      description: 'Tarefas voltadas ao desenvolvimento de funcionalidades.',
      color: '#581845',
      criadoEm: new Date('2023-03-05T11:30:00Z'),
      atualizadoEm: new Date('2023-04-02T09:00:00Z'),
    },
    {
      id: 6,
      name: 'Design',
      description: 'Tarefas relacionadas ao design e UI/UX.',
      color: '#1F77B4',
      criadoEm: new Date('2023-01-25T08:30:00Z'),
      atualizadoEm: null,
    },
    {
      id: 7,
      name: 'Marketing',
      description:
        'Tarefas relacionadas a campanhas e estratégias de marketing.',
      color: '#FFB6C1',
      criadoEm: new Date('2023-02-28T16:00:00Z'),
      atualizadoEm: new Date('2023-04-01T17:30:00Z'),
    },
    {
      id: 8,
      name: 'Teste',
      description: 'Atividades relacionadas a testes de sistemas.',
      color: '#28A745',
      criadoEm: new Date('2023-04-01T07:30:00Z'),
      atualizadoEm: new Date('2023-04-03T10:45:00Z'),
    },
  ],
}
