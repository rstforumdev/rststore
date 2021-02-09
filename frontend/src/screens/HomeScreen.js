import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid, Heading } from '@chakra-ui/react'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  // Make a request to the backend
  useEffect(() => {
    // will run whenever our component loads
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <>
      <Heading mb='8' as='h2' fontSize='3xl'>
        Latest Products
      </Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap={8}>
        {products.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </Grid>
    </>
  )
}

export default HomeScreen
