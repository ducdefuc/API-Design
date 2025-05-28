// src/controllers/beehive-controller.js

import { Beehive } from '../models/beehive.js'
import { BeehiveTransportationRequest } from '../models/beehive-transportation.js'
import { BeehiveHoneyHarvestReport } from '../models/beehive-honey-harvest.js'
import { BeehiveService } from '../services/beehiveService.js'
import { generateHighAccessBeehiveLinks, generateGeneralAccessBeehiveLinks } from '../services/hateoasService.js'
import { fireWebhook } from '../services/webhookService.js'
import mongoose from 'mongoose'

/**
 * BeehiveController to handle HTTP requests related to beehives.
 */
export class BeehiveController {
  #beehiveService

  /**
   * Constructor for BeehiveController.
   */
  constructor() {
    this.#beehiveService = new BeehiveService()
  }

  async createBeehive(req, res, next) {
    try {
      const beehive = new Beehive(req.body)
      await beehive.save()
      await fireWebhook('beehiveCreated', beehive)
      const links = generateHighAccessBeehiveLinks(beehive._id)
      res.status(201).json({ beehive, _links: links })
    } catch (error) {
      next(error)
    }
  }

  async getAllBeehives(req, res, next) {
    try {
      const beehives = await Beehive.find()
      res.json({ beehives })
    } catch (error) {
      next(error)
    }
  }

  async updateBeehive(req, res, next) {
    try {
      const id = req.params.id
      const location = req.body.location
      const name = req.body.name

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).json({ message: 'Invalid ID' })
      }

      const newData = {}

      if (location) newData.location = location
      if (name) newData.name = name

      const result = await Beehive.updateOne({ _id: req.params.id }, newData)

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Beehive not found' })
      }

      const updatedBeehive = await Beehive.findById(req.params.id)
      await fireWebhook('beehiveUpdated', updatedBeehive)
      const links = generateHighAccessBeehiveLinks(updatedBeehive._id)
      res.json({ updatedBeehive, _links: links })
    } catch (error) {
      next(error)
    }
  }

  async deleteBeehive(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(500).json({ message: 'Invalid ID' })
      }
      const beehiveToDelete = await Beehive.findByIdAndDelete(req.params.id)
      await fireWebhook('beehiveDeleted', { _id: req.params.id })
      if (!beehiveToDelete) {
        return res.status(404).json({ message: 'Beehive not found' })
      }
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  async getBeehiveStatusById(req, res, next) {
    try {
      const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).json({ message: 'Invalid ID' })
      }
      const beehiveStatus = await Beehive.findOne({ _id: id })

      if (!beehiveStatus) {
        return res.status(404).json({ message: 'Beehive not found' })
      }

      const links = generateGeneralAccessBeehiveLinks(id)
      res.json({ beehiveStatus, _links: links })
    } catch (error) {
      next(error)
    }
  }

  getBeehiveHumidityById = async (req, res, next) => {
    const { id, startDate, endDate } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ message: 'Invalid ID' })
    }
    try {
      const data = await this.#beehiveService.getBeehiveHumidityData(id, startDate, endDate)
      if (data.length === 0) {
        return res.status(404).json({ message: 'No data found try using a valid range' })
      }
      const links = generateGeneralAccessBeehiveLinks(id)
      res.json({ data, _links: links })
    } catch (error) {
      if (error.message === 'Beehive not found') {
        return res.status(404).json({ message: 'Beehive not found' })
      }
      next(error)
    }
  }

  getBeehiveWeightById = async (req, res, next) => {
    const { id, startDate, endDate } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ message: 'Invalid ID' })
    }
    try {
      const data = await this.#beehiveService.getBeehiveWeightData(id, startDate, endDate)
      if (data.length === 0) {
        return res.status(404).json({ message: 'No data found try using a valid range' })
      }
      const links = generateGeneralAccessBeehiveLinks(id)
      res.json({ data, _links: links })
    } catch (error) {
      if (error.message === 'Beehive not found') {
        return res.status(404).json({ message: 'Beehive not found' })
      }
      next(error)
    }
  }

  getBeehiveTemperatureById = async (req, res, next) => {
    const { id, startDate, endDate } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ message: 'Invalid ID' })
    }
    try {
      const data = await this.#beehiveService.getBeehiveTemperatureData(id, startDate, endDate)
      if (data.length === 0) {
        return res.status(404).json({ message: 'No data found try using a valid range' })
      }
      const links = generateGeneralAccessBeehiveLinks(id)
      res.json({ data, _links: links })
    } catch (error) {
      if (error.message === 'Beehive not found') {
        return res.status(404).json({ message: 'Beehive not found' })
      }
      next(error)
    }
  }

  getBeehiveArrivalAndDepartureflowById = async (req, res, next) => {
    const { id, startDate, endDate } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ message: 'Invalid ID' })
    }
    try {
      const data = await this.#beehiveService.getBeehiveArrivalAndDepartureflowData(id, startDate, endDate)
      if (data.length === 0) {
        return res.status(404).json({ message: 'No data found try using a valid range' })
      }
      const links = generateGeneralAccessBeehiveLinks(id)
      res.json({ data, _links: links })
    } catch (error) {
      if (error.message === 'Beehive not found') {
        return res.status(404).json({ message: 'Beehive not found' })
      }
      next(error)
    }
  }

  async createTransportationRequest(req, res, next) {
    try {
      const request = new BeehiveTransportationRequest(req.body)
      if (!mongoose.Types.ObjectId.isValid(request.requestedUserId) || !mongoose.Types.ObjectId.isValid(request.requestedBeehiveId)) {
        return res.status(500).json({ message: 'Invalid ID for user or beehive' })
      }
      await request.save()
      await fireWebhook('beehiveTransportationRequestCreated', request)
      const links = generateHighAccessBeehiveLinks(request.beehiveId)
      res.status(201).json({ request, _links: links })
    } catch (error) {
      next(error)
    }
  }

  async reportHoneyHarvested(req, res, next) {
    try {
      const honeyHarvestReport = new BeehiveHoneyHarvestReport(req.body)
      if (!mongoose.Types.ObjectId.isValid(honeyHarvestReport.userId) || !mongoose.Types.ObjectId.isValid(honeyHarvestReport.beehiveId)) {
        return res.status(500).json({ message: 'Invalid ID for user or beehive' })
      }
      await honeyHarvestReport.save()
      await fireWebhook('honeyHarvestReportCreated', honeyHarvestReport)
      const links = generateHighAccessBeehiveLinks(honeyHarvestReport.beehiveId)
      res.status(201).json({ honeyHarvestReport, _links: links })
    } catch (error) {
      next(error)
    }
  }
}
