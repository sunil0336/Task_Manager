"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks")
      const data = await response.json()
      setTasks(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id))
        toast({
          title: "Success",
          description: "Task deleted successfully",
        })
      } else {
        throw new Error("Failed to delete task")
      }
    } catch (error) {
      console.error("Error deleting task:", error)
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-2">No tasks found</h3>
        <p className="text-muted-foreground mb-4">Create your first task to get started</p>
        <Link href="/tasks/new">
          <Button>Create Task</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <Card key={task._id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="mr-2">{task.title}</CardTitle>
              <Badge
                variant={
                  task.status === "completed" ? "success" : task.status === "in-progress" ? "warning" : "default"
                }
              >
                {task.status}
              </Badge>
            </div>
            <CardDescription>Due: {new Date(task.dueDate).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{task.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/tasks/${task._id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={() => deleteTask(task._id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

