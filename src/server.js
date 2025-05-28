// src/server.js

import { connectDB } from './config/mongoose.js'
import { router } from './routes/router.js'
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerui from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

// Load environment variables from .env file
dotenv.config()

try {
  // Connect to the database.
  await connectDB()

  const app = express()

  app.use(helmet())

  // Recognize incoming Request Object as a JSON Object
  app.use(express.json())

  app.use(morgan('dev'))

  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Beehive Management System API',
      version: '1.0.0',
      description: 'API for managing beehives'
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: 'Development server'
      }
    ],
  }

  const options = {
    swaggerDefinition,
    apis: [
      './src/routes/api-v1/authentication-router.js',
      './src/routes/api-v1/beehive-router.js',
      './src/routes/api-v1/webhook-router.js',
    ]
  }

  const swaggerSpec = swaggerJSDoc(options)

  app.use(`${process.env.BASE_URL}/api-docs`, swaggerui.serve, swaggerui.setup(swaggerSpec))

  app.use(process.env.BASE_URL, router)

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}${process.env.BASE_URL}`)
    console.log(`API documentation available at http://localhost:${process.env.PORT}${process.env.BASE_URL}/api-docs`)
  })
} catch (error) {
  console.error('Error:', error)
  process.exitCode = 1
}
