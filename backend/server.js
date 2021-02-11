import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors' // eslint-disable-line
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

// show this once basic server setup is done
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
