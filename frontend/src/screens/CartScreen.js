import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Text, Grid, Heading, Box } from '@chakra-ui/react'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

// to get the location - query string. For ex. ?qty=10
// we need `location` as well to use that

// history is used to redirect

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  // console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId))
    }
  }, [dispatch, productId, qty])

  return (
    <Grid gridTemplateColumns='3'>
      <Box>
        <Heading mb='8'>Shopping Cart</Heading>
        <Flex>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <Text>...products</Text>
          )}
        </Flex>
      </Box>
    </Grid>
  )
}

export default CartScreen
