import { ObjectId } from "mongodb"
import { connectToDatabase } from "./mongodb"

export async function getTask(id) {
  try {
    const { db } = await connectToDatabase()
    const task = await db.collection("tasks").findOne({
      _id: new ObjectId(id),
    })

    if (!task) {
      return null
    }

    return task
  } catch (error) {
    console.error("Error fetching task:", error)
    return null
  }
}

export async function getTasks() {
  try {
    const { db } = await connectToDatabase()
    const tasks = await db.collection("tasks").find({}).sort({ createdAt: -1 }).toArray()

    return tasks
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return []
  }
}

// import { mockDataStore } from "./mock-data"
// // import { connectToDatabase } from './mongodb'

// export async function getTask(id) {
//   try {
//     // Using mock data instead of MongoDB
//     return mockDataStore.getTaskById(id)

//     // MongoDB implementation (commented out)
//     /*
//     const { db } = await connectToDatabase()
//     const task = await db.collection('tasks').findOne({ 
//       _id: new ObjectId(id) 
//     })
    
//     if (!task) {
//       return null
//     }
    
//     return task
//     */
//   } catch (error) {
//     console.error("Error fetching task:", error)
//     return null
//   }
// }

// export async function getTasks() {
//   try {
//     // Using mock data instead of MongoDB
//     return mockDataStore.getAllTasks()

//     // MongoDB implementation (commented out)
//     /*
//     const { db } = await connectToDatabase()
//     const tasks = await db.collection('tasks')
//       .find({})
//       .sort({ createdAt: -1 })
//       .toArray()
    
//     return tasks
//     */
//   } catch (error) {
//     console.error("Error fetching tasks:", error)
//     return []
//   }
// }

