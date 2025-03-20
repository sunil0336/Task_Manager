import { notFound } from "next/navigation"
import TaskForm from "@/components/task-form"
import { getTask } from "@/lib/tasks"

export default async function EditTaskPage({ params }) {
  const task = await getTask(params.id)

  if (!task) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Task</h1>
      <TaskForm task={task} />
    </div>
  )
}

