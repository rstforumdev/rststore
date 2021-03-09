import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  Button,
  Divider,
  Select,
  Box,
  Link,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProductDetails,
  createProductReview // STEP 76: IMPORT IT
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1) // set it to 1 instead of 0

  // STEP 76: Local state for review form
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  // STEP 76: We need the userInfo to see if a user is logged in
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // STEP 76: Read the productReviewCreate piece of state
  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview
  } = productReviewCreate

  useEffect(() => {
    // if product submitted clear everything
    if (successProductReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  // Submit comment
  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment
      })
    )
  }

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
        <>
          <Grid
            templateColumns={{ sm: '1fr', md: '5fr 7fr', lg: '5fr 4fr 3fr' }}
            gap='10'>
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

              {product.countInStock > 0 && (
                <Flex justifyContent='space-between' py='2'>
                  <Text>Qty:</Text>
                  <Select
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                    width='30%'>
                    {[...Array(product.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}

              <Button
                onClick={addToCartHandler}
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
          {/* Review form */}
          <Box mt='10'>
            <Box>
              <Heading as='h2' size='xl' mb='4'>
                Reviews
              </Heading>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <Box p='4' bgColor='white' rounded='md' mb='1'>
                {product.reviews.map(review => (
                  <Flex direction='column' key={review._id} mb='5'>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='lg'>
                        <strong>{review.name}</strong> on{' '}
                        {review.createdAt.substring(0, 10)}
                      </Text>
                      <Rating value={review.rating} />
                    </Flex>
                    <Text mt='2'>{review.comment}</Text>
                  </Flex>
                ))}
              </Box>
              <Box
                p='10'
                bgColor='white'
                rounded='md'
                mt='10'
                border='2px'
                borderColor='gray.300'>
                <Heading as='h3' size='lg' mb='6'>
                  Write a review
                </Heading>
                {errorProductReview && (
                  <Message type='error'>{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <FormControl id='rating' mb='3'>
                      <FormLabel>Rating</FormLabel>
                      <Select
                        placeholder='Select option'
                        value={rating}
                        onChange={e => setRating(e.target.value)}>
                        <option>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Okay</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Select>
                    </FormControl>
                    <FormControl id='comment' mb='3'>
                      <FormLabel>Comment</FormLabel>
                      <Textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}></Textarea>
                    </FormControl>
                    <Button colorScheme='teal' type='submit'>
                      Post Review
                    </Button>
                  </form>
                ) : (
                  <Message>
                    Please{' '}
                    <Link as={RouterLink} to='/login'>
                      log in
                    </Link>{' '}
                    to write a review.
                  </Message>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default ProductScreen
