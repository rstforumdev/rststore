import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors' // eslint-disable-line
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) // accept JSON data in the body

// Middle-ware example -> just for explanation
// app.use((req, res, next) => {
//   console.log('HELLO', req.originalUrl)
//   next()
// })

// show this once basic server setup is done
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// We could have written all the code here, but
// it can get messy. Hence we added them in another folder

// middleware for 404
app.use(notFound)
// middleware for error handling
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
