import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Heading } from '@chakra-ui/react'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
  const dispatch = useDispatch()

  // DO THIS STEP AFTER THE EMPTY PRODUCTS PART. FIRST SHOW REDUX IN THE DEVTOOLS
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  // we pass dispatch as a dependency
  // so everything dispatch changes, our component will reload

  // ADD THIS TEMPORARILY AND SHOW THE REDUX USAGE IN THE DEVTOOLS
  // const products = []

  return (
    <>
      <Heading mb='8' as='h2' fontSize='3xl'>
        Latest Products
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='error'>{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            md: 'repeat(2, 1fr)',
            sm: 'repeat(1, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)'
          }}
          gap={8}>
          {products.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </>
  )
}

export default HomeScreen
