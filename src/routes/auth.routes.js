  const express = require('express')
  const userModel = require('../models/user.model') // Adjust the path as needed

  const router = express.Router()

  // Logic for user registration
  router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const existingUser = await userModel.findOne({
      username,
    })

    if (existingUser) {
      return res.status(409).json({
        message: 'Username already exists',
      })
    }
    const user = await userModel.create({
      username,
      password,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)


    res.cookie('token', token, )

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    })
  })

  module.exports = router

  /**
   * Routes for authentication (login, signup, logout)
   *
   * 1. POST /register - Create a new user account
   * 2. POST /login - Authenticate a user and return a token
   * 3. GET /user - Get user information[this api is protected]
   */
