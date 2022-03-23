export interface TodoItem {
  id: string
  title: string
  description: string | null
  notes: string | null
  isCompleted: boolean
  dateCompleted: string | null
  dateCreated: string
}
