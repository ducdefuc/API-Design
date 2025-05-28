// src/models/beehive.js

import mongoose from 'mongoose'

const BeehiveSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  timestamp: { type: Date, required: true },
  humidity: { type: Number, required: true },
  weight: { type: Number, required: true },
  temperature: { type: Number, required: true },
  arrivalAndDepartureflow: { type: Number, required: true }
})

export const Beehive = mongoose.model('Beehive', BeehiveSchema)
