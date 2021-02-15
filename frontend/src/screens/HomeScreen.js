import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Heading } from '@chakra-ui/react'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  // we pass dispatch as a dependency
  // so everything dispatch changes, our component will reload

  // ADD THIS TEMPORARILY AND SHOW THE REDUX USAGE IN THE DEVTOOLS
  const products = []

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
