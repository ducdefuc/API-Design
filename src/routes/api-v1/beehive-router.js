// src/routes/api-v1/beehive-router.js

import express from 'express'
import { checkToken, checkRole } from '../../middleware/authentication-middleware.js'
import { BeehiveController } from '../../controllers/beehive-controller.js'

export const router = express.Router()

const beehiveController = new BeehiveController()
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Use the acces token you get from login body, to access other endpoints
 * /beehives:
 *   post:
 *     summary: Create a new beehive
 *     tags: [Endpoints accessible to farmers and admins]
 *     description: Creates a new beehive with the specified details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               humidity:
 *                 type: number
 *               weight:
 *                 type: number
 *               temperature:
 *                 type: number
 *               arrivalAndDepartureflow:
 *                 type: number
 *             required:
 *               - name
 *               - location
 *               - timestamp
 *               - humidity
 *               - weight
 *               - temperature
 *               - arrivalAndDepartureflow
 *     responses:
 *       201:
 *         description: Successfully created a new beehive.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized, no token found. Dont forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 */
router.post('/', checkToken, checkRole(['farmer', 'admin']), beehiveController.createBeehive)
/**
 * @swagger
 * /beehives:
 *   get:
 *     summary: Get all beehives
 *     tags: [Endpoints accessible to all users]
 *     description: Retrieves a list of all beehives.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
  *        description: Successfully retrieved a list of all beehives. Returns the list of beehives.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 */
router.get('/', checkToken, beehiveController.getAllBeehives)
/**
 * @swagger
 * /beehives/{id}:
 *   put:
 *     summary: Update a beehive location or name
 *     tags: [Endpoints accessible to farmers and admins]
 *     description: Update the location or name of an existing beehive.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the beehive to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: changedString
 *                 description: The new name of the beehive.
 *               location:
 *                 type: string
 *                 example: changedString
 *                 description: The new location of the beehive.
 *             required:
 *               - name
 *               - location
 *     responses:
 *       200:
 *         description: Successfully updated the beehive. Returns the updated beehive and links for further navigation.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       404:
 *         description: Beehive not found
 *       500:
 *         description: Invalid ID
 */
router.put('/:id', checkToken, checkRole(['farmer', 'admin']), beehiveController.updateBeehive)
/**
 * @swagger
 * /beehives/{id}:
 *   delete:
 *     summary: Delete a beehive
 *     tags: [Endpoints accessible to farmers and admins]
 *     description: Delete an existing beehive.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the beehive to delete.
 *     responses:
 *       204:
 *        description: Successfully deleted the beehive.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       404:
 *         description: Beehive not found.
 *       500:
 *         description: Invalid ID
 */
router.delete('/:id', checkToken, checkRole(['farmer', 'admin']), beehiveController.deleteBeehive)

/**
 * @swagger
 * /beehives/{id}/status:
 *   get:
 *     summary: Get current beehive status by id
 *     tags: [Endpoints accessible to all users]
 *     description: Retrieves the status of a specific beehive by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the beehive to retrieve the status for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the beehive status. Returns the beehive status and links for further navigation.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       404:
 *         description: Beehive not found.
 *       500:
 *         description: Invalid ID
 */
router.get('/:id/status', checkToken, beehiveController.getBeehiveStatusById)

/**
 * @swagger
 * /beehives/{id}/humidity/{startDate}/{endDate}:
 *   get:
 *     summary: Get beehive humidity data by id over a specified date range
 *     tags: [Endpoints accessible to all users]
 *     description: Retrieves humidity data for a specified beehive within a given date range.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the beehive to retrieve humidity data for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: startDate
 *         required: true
 *         description: The start date of the range for which humidity data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *       - in: path
 *         name: endDate
 *         required: true
 *         description: The end date of the range for which humidity data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successfully retrieved humidity data for the specified beehive and date range. Returns the humidity data and links for further navigation.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       404:
 *         description: Beehive not found.
 *       500:
 *         description: Invalid ID
 */
router.get('/:id/humidity/:startDate/:endDate', checkToken, beehiveController.getBeehiveHumidityById)

/**
 * @swagger
 * /beehives/{id}/weight/{startDate}/{endDate}:
 *   get:
 *     summary: Get beehive weight data by id over a specified date range
 *     tags: [Endpoints accessible to all users]
 *     description: Retrieves weight data for a specified beehive within a given date range.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the beehive to retrieve weight data for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: startDate
 *         required: true
 *         description: The start date of the range for which weight data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *       - in: path
 *         name: endDate
 *         required: true
 *         description: The end date of the range for which weight data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successfully retrieved weight data for the specified beehive and date range. Returns the weight data and links for further navigation.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       404:
 *         description: Beehive not found.
 *       500:
 *         description: Invalid ID
 */
router.get('/:id/weight/:startDate/:endDate', checkToken, beehiveController.getBeehiveWeightById)

/**
 * @swagger
 * /beehives/{id}/temperature/{startDate}/{endDate}:
 *   get:
 *     summary: Get beehive temperature data by id over a specified date range
 *     tags: [Endpoints accessible to all users]
 *     description: Retrieves temperature data for a specified beehive within a given date range.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the beehive to retrieve temperature data for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: startDate
 *         required: true
 *         description: The start date of the range for which temperature data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *       - in: path
 *         name: endDate
 *         required: true
 *         description: The end date of the range for which temperature data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successfully retrieved temperature data for the specified beehive and date range. Returns the temperature data and links for further navigation.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       404:
 *         description: Beehive not found.
 *       500:
 *         description: Invalid ID
 */
router.get('/:id/temperature/:startDate/:endDate', checkToken, beehiveController.getBeehiveTemperatureById)

/**
 * @swagger
 * /beehives/{id}/flow/{startDate}/{endDate}:
 *   get:
 *     summary: Get beehive flow data by id over a specified date range
 *     tags: [Endpoints accessible to all users]
 *     description: Retrieves flow data for a specified beehive within a given date range.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the beehive to retrieve flow data for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: startDate
 *         required: true
 *         description: The start date of the range for which flow data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *       - in: path
 *         name: endDate
 *         required: true
 *         description: The end date of the range for which flow data should be included. Format should be YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successfully retrieved flow data for the specified beehive and date range. Returns the flow data and links for further navigation.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       404:
 *         description: Beehive not found.
 *       500:
 *         description: Invalid ID
 */
router.get('/:id/flow/:startDate/:endDate', checkToken, beehiveController.getBeehiveArrivalAndDepartureflowById)

/**
 * @swagger
 * /beehives/request-transportation:
 *   post:
 *     summary: Create a new transportation request
 *     tags: [Endpoints accessible to farmers]
 *     description: Submit a request for beehive transportation.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestedUserId:
 *                 type: string
 *                 example: Enter a valid user ID here
 *                 description: The ID of the user making the request.
 *               requestedBeehiveId:
 *                 type: string
 *                 example: Enter a valid user beehive ID here.
 *                 description: The ID of the beehive to be transported.
 *               requestedDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the transportation is requested.
 *               requestedLocation:
 *                 type: string
 *                 example: Enter the location you want to transfer the beehive to here.
 *                 description: The location where the beehive should be transported to.
 *             required:
 *               - requestedUserId
 *               - requestedBeehiveId
 *               - requestedDate
 *               - requestedLocation
 *     responses:
 *       201:
 *         description: Transportation request created successfully.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       500:
 *         description: Invalid ID for user or beehive.
 */
router.post('/request-transportation', checkToken, checkRole(['farmer']), beehiveController.createTransportationRequest)

/**
 * @swagger
 * /beehives/report-harvest:
 *   post:
 *     summary: Create a new honey harvest report
 *     tags: [Endpoints accessible to farmers]
 *     description: Submit a request for beehive honey harvest report.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: Enter a valid user ID here
 *                 description: The ID of the user making the request.
 *               beehiveId:
 *                 type: string
 *                 example: Enter a valid user beehive ID here.
 *                 description: The ID of the beehive to report the honey harvest for.
 *               harvestDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the honey was harvested.
 *               honeyAmount:
 *                 type: number
 *                 description: The amount of honey harvested.
 *             required:
 *               - userId
 *               - beehiveId
 *               - harvestDate
 *               - honeyAmount
 *     responses:
 *       201:
 *         description: Honey harvest report created successfully.
 *       401:
 *         description: Unauthorized, no token found. Don't forget to authorize with the access token in the top right corner of the page.
 *       403:
 *         description: Forbidden, invalid token. Check if you have the correct permissions.
 *       500:
 *         description: Invalid ID for user or beehive.
 */
router.post('/report-harvest', checkToken, checkRole(['farmer']), beehiveController.reportHoneyHarvested)
