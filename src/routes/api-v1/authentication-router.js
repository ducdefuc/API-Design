// src/routes/api-v1/authentication-router.js

import express from 'express'
import { AuthenticationController } from '../../controllers/authentication-controller.js'

export const router = express.Router()

const authenticationController = new AuthenticationController()

/**
 * @swagger
 * /authentication/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication endpoints]
 *     description: Registers a new user with a specified role. If no role is provided, defaults to 'user'.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *               role:
 *                 type: string
 *                 description: The user's role
 *                 enum: [farmer, admin, user]
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid role
 *       409:
 *         description: User already exists
 */
router.post('/register', authenticationController.register)
/**
 * @swagger
 * /authentication/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication endpoints]
 *     description: Authenticates a user and returns an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Authentication successful. Returns an access token and links for further navigation.
 *       401:
 *         description: Authentication failed. Invalid username or password.
 */
router.post('/login', authenticationController.login)
