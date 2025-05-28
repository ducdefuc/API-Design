// src/routes/router.js:

import express from 'express'

import { router as v1Router } from './api-v1/router.js'

export const router = express.Router()

router.use('/', v1Router)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
