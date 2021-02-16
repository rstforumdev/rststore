import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  Button,
  Divider
} from '@chakra-ui/react'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch() // to dispatch the action we created

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  // const product = [] // just to see the state in the devtools

  return (
    <>
      <Flex mb='5'>
        <Button as={RouterLink} to='/' colorScheme='gray'>
          Go Back
        </Button>
      </Flex>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Grid templateColumns='5fr 4fr 3fr' gap='10'>
          <Image src={product.image} alt={product.name} borderRadius='md' />
          <Flex direction='column'>
            <Heading as='h6' fontSize='base' color='gray.500'>
              {product.brand}
            </Heading>
            <Heading as='h2' fontSize='4xl' mb='5'>
              {product.name}
            </Heading>
            <Rating
              value={product.rating || 0} // because the request takes some time and propTypes will complain
              text={`${product.numReviews} reviews`}
              alignment='single'
            />
            <Heading
              as='h5'
              fontSize='4xl'
              fontWeight='medium'
              color='teal.600'
              mt='5'
              mb='5'>
              ₹{product.price}
            </Heading>
            <Text color='gray.500'>{product.description}</Text>
          </Flex>
          <Flex direction='column'>
            <Flex justifyContent='space-between' py='2'>
              <Text>Price:</Text>
              <Text fontWeight='bold'>₹{product.price}</Text>
            </Flex>
            <Divider />
            <Flex justifyContent='space-between' py='2'>
              <Text>Status:</Text>
              <Text fontWeight='bold'>
                {product.countInStock > 0 ? 'In Stock' : 'Not Available'}
              </Text>
            </Flex>
            <Divider />
            <Button
              bgColor='gray.800'
              textTransform='uppercase'
              letterSpacing='wide'
              colorScheme='teal'
              my='2'
              disabled={product.countInStock === 0}>
              Add To Cart
            </Button>
          </Flex>
        </Grid>
      )}
    </>
  )
}

export default ProductScreen
