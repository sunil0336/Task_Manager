import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || "task-manager"

// Check if MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Create a new MongoDB client
  const client = new MongoClient(MONGODB_URI)

  // Connect to the MongoDB server
  await client.connect()

  // Get the database
  const db = client.db(MONGODB_DB)

  // Cache the client and db connections
  cachedClient = client
  cachedDb = db

  return { client, db }
}

// This file contains MongoDB connection logic
// Currently not in use as we're using mock data
// Uncomment to use MongoDB instead of mock data

// import { MongoClient } from "mongodb"

// const MONGODB_URI = process.env.MONGODB_URI
// const MONGODB_DB = process.env.MONGODB_DB || "task-manager"

// // Check if MongoDB URI is defined
// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable")
// }

// let cachedClient = null
// let cachedDb = null

// export async function connectToDatabase() {
//   // If we have a cached connection, use it
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb }
//   }

//   // Create a new MongoDB client
//   const client = new MongoClient(MONGODB_URI)

//   // Connect to the MongoDB server
//   await client.connect()

//   // Get the database
//   const db = client.db(MONGODB_DB)

//   // Cache the client and db connections
//   cachedClient = client
//   cachedDb = db

//   return { client, db }
// }

