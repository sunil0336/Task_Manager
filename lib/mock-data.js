// Mock data store to replace MongoDB
const tasks = [
    {
      _id: "1",
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the task manager project",
      status: "in-progress",
      dueDate: new Date("2023-12-30").toISOString(),
      createdAt: new Date("2023-12-01").toISOString(),
      updatedAt: new Date("2023-12-10").toISOString(),
    },
    {
      _id: "2",
      title: "Fix navigation bug",
      description: "Address the navigation issue on mobile devices",
      status: "pending",
      dueDate: new Date("2023-12-25").toISOString(),
      createdAt: new Date("2023-12-05").toISOString(),
      updatedAt: new Date("2023-12-05").toISOString(),
    },
    {
      _id: "3",
      title: "Deploy to production",
      description: "Deploy the application to the production environment",
      status: "completed",
      dueDate: new Date("2023-12-15").toISOString(),
      createdAt: new Date("2023-12-02").toISOString(),
      updatedAt: new Date("2023-12-15").toISOString(),
    },
    {
      _id: "4",
      title: "User testing",
      description: "Conduct user testing sessions with stakeholders",
      status: "pending",
      dueDate: new Date("2023-12-28").toISOString(),
      createdAt: new Date("2023-12-08").toISOString(),
      updatedAt: new Date("2023-12-08").toISOString(),
    },
  ]
  
  // Helper function to generate a simple ID
  // In a real app, you'd use a more robust ID generation method
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
  
  // CRUD operations for the mock data store
  export const mockDataStore = {
    // Get all tasks
    getAllTasks: () => {
      return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
  
    // Get a single task by ID
    getTaskById: (id) => {
      return tasks.find((task) => task._id === id) || null
    },
  
    // Create a new task
    createTask: (taskData) => {
      const newTask = {
        _id: generateId(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
  
      tasks.push(newTask)
      return newTask
    },
  
    // Update an existing task
    updateTask: (id, taskData) => {
      const index = tasks.findIndex((task) => task._id === id)
  
      if (index === -1) {
        return null
      }
  
      const updatedTask = {
        ...tasks[index],
        ...taskData,
        updatedAt: new Date().toISOString(),
      }
  
      tasks[index] = updatedTask
      return updatedTask
    },
  
    // Delete a task
    deleteTask: (id) => {
      const index = tasks.findIndex((task) => task._id === id)
  
      if (index === -1) {
        return false
      }
  
      tasks.splice(index, 1)
      return true
    },
  }
  
  