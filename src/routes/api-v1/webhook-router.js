// src/routes/api-v1/webhook-router.js

import express from 'express'
import { WebhookController } from '../../controllers/webhook-controller.js'

export const router = express.Router()
const webhookController = new WebhookController()

/**
 * @swagger
 * /webhook/register:
 *   post:
 *     summary: Register a new webhook
 *     tags: [Webhooks]
 *     description: Allows for the registration of a new webhook to listen for specific events.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: This should be a valid URL
 *                 description: The URL the webhook should send POST requests to when the specified events occur.
 *               events:
 *                 type: array
 *                 example: ['beehiveCreated', 'beehiveUpdated', 'beehiveDeleted', 'beehiveTransportationRequestCreated', 'honeyHarvestReportCreated' ]
 *                 items:
 *                   type: string
 *                 description: A list of events the webhook is interested in. E.g., ['beehiveCreated', 'beehiveUpdated']
 *             required:
 *               - url
 *               - events
 *     responses:
 *       201:
 *        description: Webhook successfully registered. 
 *       400:
 *         description: Bad request. Validation error due to incorrect request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', webhookController.registerWebhook)
