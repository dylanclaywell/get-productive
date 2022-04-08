import { Tag } from '@graphql/generated/graphql'

export interface TodoItem {
  id: string
  title: string
  description: string | null
  notes: string | null
  isCompleted: boolean
  dateCompleted: Date | null
  dateCreated: Date
  tags: Tag[]
}
