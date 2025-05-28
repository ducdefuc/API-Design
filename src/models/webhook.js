// src/models/webhook.js

import mongoose from 'mongoose'

const webhookSchema = new mongoose.Schema({
  url: { type: String, required: true, trim: true },
  events: { type: [String], required: true }
}, {
  timestamps: true, // This is the correct place for timestamps
  toJSON: {
    virtuals: true,
    /**
     * Transforms the object returned to not include the _id and __v fields.
     *
     * @param {object} doc - The document being converted.
     * @param {object} ret - The returned object.
     */
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    }
  }
})

export const Webhook = mongoose.model('Webhook', webhookSchema)
