// src/middleware/authentication-middleware.js

import jwt from 'jsonwebtoken'

/**
 * Check and verify the token in the request header.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} passes to next middleware.
 */
export const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    const error = new Error('Unauthorized, no token found')
    error.status = 401
    return next(error)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      const error = new Error('Forbidden, invalid token')
      error.status = 403
      return next(error)
    }
    req.user = user
    return next()
  })
}

/**
 * Check if a user has the required role to access a route.
 *
 * @param {Array} roles - The required roles.
 * @returns {Function} Middleware function.
 */
export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error('Forbidden, invalid role')
      error.status = 403
      return next(error)
    }
    return next()
  }
}
