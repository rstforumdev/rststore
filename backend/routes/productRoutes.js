import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// Product.find() will return a promise, so we will
// have to add a try/catch. But since all our routing
// will use this style of logic, we'll use an external
// package called express-async-handler middleware to
// handle this.

// router.get('/', async (req, res) => {
//   const products = await Product.find({})

//   res.json(products)
// })

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // Mock an error to Redux displaying it properly
    // res.status(401)
    // throw new Error('Not Authorized')
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
