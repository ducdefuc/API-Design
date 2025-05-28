// src/controllers/authentication-controller.js

import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
import { generateLinkAfterRegister, generateLinksAfterLogin } from '../services/hateoasService.js'

/**
 * Authentication controller.
 */
export class AuthenticationController {
  async register(req, res, next) {
    try {
      const allowedRoles = ['admin', 'farmer', 'user']
      const { username, password, role } = req.body

      if (role && !allowedRoles.includes(role)) {
        res.status(400).json({ message: 'Invalid role' })
      }
      const user = new User({ username, password, role: role || 'user' })

      if (await User.findOne({ username })) {
        res.status(409).json({ message: 'User already exists' })
      }
      await user.save()
      const links = generateLinkAfterRegister(user.role)
      res.status(201).json({ message: 'User successfully registered', user: { username: user.username, _id: user._id }, _links: links })
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      let user
  
      try {
        user = await User.authenticate(username, password)
      } catch (error) {
        return res.status(401).json({ message: error.message })
      }
  
      const payload = { _id: user._id, username: user.username, role: user.role }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: process.env.ACCESS_TOKEN_LIFETIME })
      const links = generateLinksAfterLogin(user.role)
  
      res.json({
        message: 'You successfully logged in, you can now start browsing the Beehive API!',
        accessToken,
        _id: user._id,
        _links: links
      })
    } catch (error) {
      next(error)
    }
  }
}

