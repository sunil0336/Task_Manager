import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase()
    const task = await db.collection("tasks").findOne({ _id: new ObjectId(params.id) })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.dueDate) {
      return NextResponse.json({ error: "Title and due date are required" }, { status: 400 })
    }

    const updatedTask = {
      ...data,
      updatedAt: new Date(),
    }

    const result = await db.collection("tasks").updateOne({ _id: new ObjectId(params.id) }, { $set: updatedTask })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...updatedTask,
    })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase()

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}

// import { NextResponse } from "next/server"
// import { mockDataStore } from "@/lib/mock-data"
// // import { ObjectId } from 'mongodb'
// // import { connectToDatabase } from '@/lib/mongodb'

// export async function GET(request, { params }) {
//   try {
//     // Using mock data instead of MongoDB
//     const task = mockDataStore.getTaskById(params.id)

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 })
//     }

//     return NextResponse.json(task)

//     // MongoDB implementation (commented out)
//     /*
//     const { db } = await connectToDatabase()
//     const task = await db.collection('tasks').findOne({ _id: new ObjectId(params.id) })
    
//     if (!task) {
//       return NextResponse.json(
//         { error: 'Task not found' },
//         { status: 404 }
//       )
//     }
    
//     return NextResponse.json(task)
//     */
//   } catch (error) {
//     console.error("Error fetching task:", error)
//     return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     const data = await request.json()

//     // Validate required fields
//     if (!data.title || !data.dueDate) {
//       return NextResponse.json({ error: "Title and due date are required" }, { status: 400 })
//     }

//     // Using mock data instead of MongoDB
//     const updatedTask = mockDataStore.updateTask(params.id, data)

//     if (!updatedTask) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 })
//     }

//     return NextResponse.json(updatedTask)

//     // MongoDB implementation (commented out)
//     /*
//     const { db } = await connectToDatabase()
    
//     const updatedTask = {
//       ...data,
//       updatedAt: new Date(),
//     }
    
//     const result = await db.collection('tasks').updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: updatedTask }
//     )
    
//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { error: 'Task not found' },
//         { status: 404 }
//       )
//     }
    
//     return NextResponse.json({ 
//       _id: params.id,
//       ...updatedTask 
//     })
//     */
//   } catch (error) {
//     console.error("Error updating task:", error)
//     return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     // Using mock data instead of MongoDB
//     const success = mockDataStore.deleteTask(params.id)

//     if (!success) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true })

//     // MongoDB implementation (commented out)
//     /*
//     const { db } = await connectToDatabase()
    
//     const result = await db.collection('tasks').deleteOne({ 
//       _id: new ObjectId(params.id) 
//     })
    
//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { error: 'Task not found' },
//         { status: 404 }
//       )
//     }
    
//     return NextResponse.json({ success: true })
//     */
//   } catch (error) {
//     console.error("Error deleting task:", error)
//     return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
//   }
// }

