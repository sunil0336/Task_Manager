import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const tasks = await db.collection("tasks").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.dueDate) {
      return NextResponse.json({ error: "Title and due date are required" }, { status: 400 })
    }

    const newTask = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("tasks").insertOne(newTask)

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...newTask,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}

// import { NextResponse } from "next/server"
// import { mockDataStore } from "@/lib/mock-data"
// // import { connectToDatabase } from '@/lib/mongodb'

// export async function GET() {
//   try {
//     // Using mock data instead of MongoDB
//     const tasks = mockDataStore.getAllTasks()
//     return NextResponse.json(tasks)

//     // MongoDB implementation (commented out)
//     /*
//     const { db } = await connectToDatabase()
//     const tasks = await db.collection('tasks').find({}).sort({ createdAt: -1 }).toArray()
    
//     return NextResponse.json(tasks)
//     */
//   } catch (error) {
//     console.error("Error fetching tasks:", error)
//     return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
//   }
// }

// export async function POST(request) {
//   try {
//     const data = await request.json()

//     // Validate required fields
//     if (!data.title || !data.dueDate) {
//       return NextResponse.json({ error: "Title and due date are required" }, { status: 400 })
//     }

//     // Using mock data instead of MongoDB
//     const newTask = mockDataStore.createTask(data)
//     return NextResponse.json(newTask, { status: 201 })

//     // MongoDB implementation (commented out)
//     /*
//     const { db } = await connectToDatabase()
    
//     const newTask = {
//       ...data,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
    
//     const result = await db.collection('tasks').insertOne(newTask)
    
//     return NextResponse.json(
//       { 
//         _id: result.insertedId,
//         ...newTask 
//       },
//       { status: 201 }
//     )
//     */
//   } catch (error) {
//     console.error("Error creating task:", error)
//     return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
//   }
// }


