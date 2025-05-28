// src/models/beehive-transportation.js

import mongoose from 'mongoose'

const BeehiveTransportationRequestSchema = new mongoose.Schema({
  requestedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, trim: true },
  requestedBeehiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Beehive', required: true, trim: true },
  requestedDate: { type: Date, required: true, trim: true },
  requestedLocation: { type: String, required: true, trim: true }
})

export const BeehiveTransportationRequest = mongoose.model('BeehiveTransportation', BeehiveTransportationRequestSchema)
