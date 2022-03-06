import TodoCard from '../components/TodoCard'

export default function Main() {
  return (
    <div className="flex h-screen">
      <div className="w-96">Categories</div>
      <div className="bg-gray-400 w-full h-full p-8">
        <TodoCard />
      </div>
    </div>
  )
}
