// src/services/webhookService.js

import { Webhook } from '../models/webhook.js'
import fetch from 'node-fetch'

/**
 * Fires a webhook for the given event.
 *
 * @param {string} event - The event that triggered the webhook.
 * @param {object} data - The data to send in the webhook.
 */
export const fireWebhook = async (event, data) => {
  const webhooks = await Webhook.find({ events: event })
  webhooks.forEach(async (webhook) => {
    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event,
          data,
          timestamp: new Date()
        })
      })
      if (!response.ok) {
        console.error(`Failed to send webhook to ${webhook.url}`, response.statusText)
      }
    } catch (error) {
      console.error(`Failed to send webhook to ${webhook.url}`, error)
    }
  })
}
