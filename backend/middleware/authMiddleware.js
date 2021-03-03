import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  // Tokens will be sent (by us in React) in the request headers
  // in the Authorization property
  let token
  // console.log(req.headers.authorization)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // console.log('token found') // just for teaching

    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded.id)

      // Get the user's id from the token
      // select() func with -password will just exclude
      // password and return everything else
      // We have also now added a new `user` key on the `req` object
      const test1 = await User.findById(decoded.id)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  // Handle if we don't get a token
  if (!token) {
    res.status(401) // unauthorized
    throw new Error('Not Authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401) // Not Authorized
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
