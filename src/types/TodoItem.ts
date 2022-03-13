export interface TodoItem {
  id: string
  title: string
  // description?: string
  isCompleted: boolean
  dateCompleted: Date | undefined
  dateCreated: Date
}
