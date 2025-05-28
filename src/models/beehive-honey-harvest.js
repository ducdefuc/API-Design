// src/models/beehive-honey-harvest.js

import mongoose from 'mongoose'

const BeehiveHoneyHarvestReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, trim: true },
  beehiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Beehive', required: true, trim: true },
  harvestDate: { type: Date, required: true, trim: true },
  honeyAmount: { type: Number, required: true, trim: true }
})

export const BeehiveHoneyHarvestReport = mongoose.model('BeehiveHoneyHarvest', BeehiveHoneyHarvestReportSchema)
