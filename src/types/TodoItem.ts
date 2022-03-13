export interface TodoItem {
  id: string
  title: string
  description?: string
  notes?: string
  tags?: string[]
  isCompleted: boolean
  dateCompleted: Date | undefined
  dateCreated: Date
}
