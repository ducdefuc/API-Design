// src/routes/api-v1/router.js

import express from 'express'
import dotenv from 'dotenv'
import { router as authenticationRouter } from './authentication-router.js'
import { router as beehiveRouter } from './beehive-router.js'
import { router as webhookRouter } from './webhook-router.js'

dotenv.config()

export const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: `Welcome to the Beehive Management System API, try the endpoint http://localhost:${process.env.PORT}${process.env.BASE_URL}/api-docs to access the swagger documentation` })
})

router.use('/authentication', authenticationRouter)
router.use('/beehives', beehiveRouter)
router.use('/webhook', webhookRouter)
