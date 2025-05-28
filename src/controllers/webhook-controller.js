// src/controllers/webhook-controller.js

import { Webhook } from '../models/webhook.js'

/**
 * Controller for webhook operations.
 */
export class WebhookController {
  async registerWebhook(req, res, next) {
    try {
      const { url, events } = req.body
      const webhook = new Webhook({ url, events })
      await webhook.save()
      res.status(201).json({ message: 'Webhook successfully registered', webhook })
    } catch (error) {
      next(error)
    }
  }
}
