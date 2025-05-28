/**
 * Module for the User model
 *
 * @module src/models/user.js
 * @author Duc Anh Pham
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// User schema.
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'farmer', 'user'], default: 'user' }
})

// When a user password is modified/saved it transforms into a hashed version beforing storing in database
UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

/**
 * Static method to authenticate a user.
 *
 * @static
 * @param {string} username - The username to authenticate.
 * @param {string} password - The password to authenticate.
 * @returns {Promise<object>} A promise that resolves along with the authenticated user.
 */
UserSchema.statics.authenticate = async function (username, password) {
  if (!username || !password) {
    throw new Error('Invalid username or password')
  }

  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Invalid username or password')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    throw new Error('Invalid username or password')
  }

  return user
}

export const User = mongoose.model('User', UserSchema)
