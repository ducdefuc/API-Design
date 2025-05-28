// src/services/beehiveService.js

import mongoose from 'mongoose'
import { Beehive } from '../models/beehive.js'

/**
 * Service for beehives operations.
 */
export class BeehiveService {
  /**
   * Get beehive humidity data.
   *
   * @param {string} id - The beehive id.
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   * @returns {Promise<object>} The data of the chosen beehive humidities within the specified date range.
   */
  async getBeehiveHumidityData (id, startDate, endDate) {
    const beehive = await Beehive.findById(id)
    if (!beehive) {
      throw new Error('Beehive not found')
    }

    const location = beehive.location
    const collectionName = `humidity_${location.toLowerCase()}`
    const HumidityData = mongoose.connection.collection(collectionName)

    const data = await HumidityData.find({
      timestamp: { $gte: startDate, $lte: endDate }
    }).toArray()

    return data
  }

  /**
   * Get beehive weight data.
   *
   * @param {string} id - The beehive id.
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   * @returns {Promise<object>} The data of the chosen beehive weights within the specified date range.
   */
  async getBeehiveWeightData (id, startDate, endDate) {
    const beehive = await Beehive.findById(id)
    if (!beehive) {
      throw new Error('Beehive not found')
    }

    const location = beehive.location
    const collectionName = `weight_${location.toLowerCase()}`
    const WeightData = mongoose.connection.collection(collectionName)

    const data = await WeightData.find({
      timestamp: { $gte: startDate, $lte: endDate }
    }).toArray()

    return data
  }

  /**
   * Get beehive temperature data.
   *
   * @param {string} id - The beehive id.
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   * @returns {Promise<object>} The data of the chosen beehive temperatures within the specified date range.
   */
  async getBeehiveTemperatureData (id, startDate, endDate) {
    const beehive = await Beehive.findById(id)
    if (!beehive) {
      throw new Error('Beehive not found')
    }

    const location = beehive.location
    const collectionName = `temperature_${location.toLowerCase()}`
    const TemperatureData = mongoose.connection.collection(collectionName)

    const data = await TemperatureData.find({
      timestamp: { $gte: startDate, $lte: endDate }
    }).toArray()

    return data
  }

  /**
   * Get beehive arrival and departure flow data.
   *
   * @param {string} id - The beehive id.
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   * @returns {Promise<object>} The data of the chosen beehive arrival and departure flows within the specified date range.
   */
  async getBeehiveArrivalAndDepartureflowData (id, startDate, endDate) {
    const beehive = await Beehive.findById(id)
    if (!beehive) {
      throw new Error('Beehive not found')
    }

    const location = beehive.location
    const collectionName = `flow_${location.toLowerCase()}`
    const ArrivalAndDepartureflowData = mongoose.connection.collection(collectionName)

    const data = await ArrivalAndDepartureflowData.find({
      timestamp: { $gte: startDate, $lte: endDate }
    }).toArray()

    return data
  }
}
