const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')

dotenv.config()

const app = express()

// show this once basic server setup is done
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/products', (req, res) => {
  res.json(products) // convert the js object to json and send it
})

// Show this after the above 2 are done
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
