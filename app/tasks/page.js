import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getTasks } from "@/lib/tasks"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, PlusCircle } from "lucide-react"

export default async function TasksPage() {
  const tasks = await getTasks()

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Tasks</h1>
        <Link href="/tasks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">Create your first task to get started</p>
          <Link href="/tasks/new">
            <Button>Create Task</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableCaption>A list of all your tasks</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.status === "completed" ? "success" : task.status === "in-progress" ? "warning" : "default"
                      }
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/tasks/${task._id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <form action={`/api/tasks/${task._id}`} method="DELETE">
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

