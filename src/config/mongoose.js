/**
 * Mongoose configuration at /src/config/mongoose.js
 *
 * @author Duc Anh Pham
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Handles mongoDB connections and connects to the mongoDB database.
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
export const connectDB = async () => {
  const { connection } = mongoose

  connection.on('connected', () => console.log('MongoDB connected.'))
  connection.on('error', (err) => console.error(`MongoDB connection error encountered: ${err}`))
  connection.on('disconnected', () => console.log('MongoDB disconnected.'))

  // Event listener for SIGINT (signal interrupted), when mongoDB connection closed.
  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('MongoDB disconnected, application terminated.')
      process.exit(0)
    })
  })

  // Connect to the MongoDB server.
  return mongoose.connect(process.env.DB_CONNECTION_STRING)
}
