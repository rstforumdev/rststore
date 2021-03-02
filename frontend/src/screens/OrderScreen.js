// Copied from PlaceOrderScreen and then modified

import React, { useEffect, useState } from 'react'
import axios from 'axios' // (PP (STEP 1))
import { PayPalButton } from 'react-paypal-button-v2' // (PP (STEP 2))
import { Link as RouterLink } from 'react-router-dom'
import {
  // Button,
  Flex,
  Heading,
  Box,
  Grid,
  Text,
  Image,
  Link
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions' // (PP Step 3)

// (PP (STEP 4) -> to avoid useEffect loop) (we will dispatch directly)
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  // (PP (STEP 1)) PAYPAL SDK READY
  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  // get the orderDetails state from our store
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  // (PP (STEP 1))
  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay // renaming destructring

  // Calculate Items Price
  // If we don't put it in !loading we will get an error.
  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currItem) => acc + currItem.price * (currItem.qty || 1),
      0
    )
  }

  useEffect(() => {
    // (PP (STEP 1)) dynamically add paypal script to page
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      // console.log(clientId)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    // addPayPalScript() // just for testing
    // if we come to the page and order isn't there, then also run this dispatch
    // and run it when successPay changes
    if (!order || successPay) {
      // START (PP (STEP LAST))
      dispatch({ type: ORDER_PAY_RESET }) // IN THE END
      // END (PP (STEP LAST))
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      // see if it's not paid
      if (!window.paypal) {
        // see if paypal script is loaded
        addPayPalScript() // if not load it
      } else {
        setSdkReady(true) // if loaded, then set sdk to ready
      }
    }
  }, [dispatch, orderId, successPay, order])

  // (PP (STEP 3 -> after adding the buttons))
  // This function is where we call our dispatch action
  // payment result is something we get from paypal
  const successPaymentHandler = paymentResult => {
    console.log('THIS IS THE PAYMENT RESULT', paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type='error'>{error}</Message>
  ) : (
    <>
      <Heading as='h1'>Order {order._id}</Heading>
      <Flex w='full' py='5' direction='column'>
        <Grid templateColumns='3fr 2fr' gap='20'>
          <Flex direction='column'>
            <Box borderBottom='1px' py='6' borderColor='gray.300'>
              <Heading as='h2' fontSize='2xl' fontWeight='semibold' mb='3'>
                Shipping
              </Heading>
              {/* ADD THESE */}
              <Text>
                <strong>Name: </strong> {order.user.name}
              </Text>
              <Text>
                <strong>Email: </strong>{' '}
                <a
                  style={{ textDecoration: 'underline' }}
                  href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>
              </Text>
              <Text mb='3'>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </Text>
              {order.isDelievered ? (
                <Message type='success'>
                  Delievered on {order.delieveredAt}
                </Message>
              ) : (
                <Message type='error'>Not Delievered</Message>
              )}
            </Box>

            <Box borderBottom='1px' py='6' borderColor='gray.300'>
              <Heading as='h2' fontSize='2xl' fontWeight='semibold' mb='3'>
                Payment Method
              </Heading>
              <Text mb='3'>
                <strong>Method:</strong> {order.paymentMethod}
              </Text>
              {order.isPaid ? (
                <Message type='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message type='error'>Not Paid</Message>
              )}
            </Box>

            <Box borderBottom='1px' py='6' borderColor='gray.300'>
              <Heading as='h2' fontSize='2xl' fontWeight='semibold' mb='3'>
                Order Items
              </Heading>
              <Box>
                {/* MAKE SURE THIS CHANGE orderItems correctly */}
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <Box py='2'>
                    {order.orderItems.map((item, index) => (
                      <Flex
                        key={index}
                        alignItems='center'
                        justifyContent='space-between'>
                        <Flex py='2' alignItems='center'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            w='12'
                            h='12'
                            objectFit='cover'
                            mr='6'
                          />
                          <Link
                            as={RouterLink}
                            to={`/product/${item.product}`}
                            fontWeight='medium'
                            fontSize='xl'>
                            {item.name}
                          </Link>
                        </Flex>
                        <Text fontSize='lg' fontWeight='semibold'>
                          {item.qty || 1} x ₹{item.price} = ₹
                          {(item.qty || 1) * item.price}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>

          <Flex
            direction='column'
            bgColor='white'
            justifyContent='space-between'
            py='8'
            px='8'
            shadow='md'
            rounded='lg'
            borderColor='gray.300'>
            <Box>
              <Heading mb='6' as='h2' fontSize='3xl' fontWeight='bold'>
                Order Summary
              </Heading>
              {/* Item prices */}
              <Flex
                borderBottom='1px'
                py='2'
                borderColor='gray.200'
                alignItems='center'
                justifyContent='space-between'>
                <Text fontSize='xl'>Items</Text>
                <Text fontWeight='bold' fontSize='xl'>
                  ₹{order.itemsPrice}
                </Text>
              </Flex>
              {/* Shipping price */}
              <Flex
                borderBottom='1px'
                py='2'
                borderColor='gray.200'
                alignItems='center'
                justifyContent='space-between'>
                <Text fontSize='xl'>Shipping</Text>
                <Text fontWeight='bold' fontSize='xl'>
                  ₹{order.shippingPrice}
                </Text>
              </Flex>
              {/* Tax price */}
              <Flex
                borderBottom='1px'
                py='2'
                borderColor='gray.200'
                alignItems='center'
                justifyContent='space-between'>
                <Text fontSize='xl'>Tax</Text>
                <Text fontWeight='bold' fontSize='xl'>
                  ₹{order.taxPrice}
                </Text>
              </Flex>
              {/* Total price */}
              <Flex py='2' alignItems='center' justifyContent='space-between'>
                <Text fontSize='xl'>Total</Text>
                <Text fontWeight='bold' fontSize='xl'>
                  ₹{order.totalPrice}
                </Text>
              </Flex>
            </Box>

            {/* Will add a paypal button here */}
            {/* (PP (STEP 2)) PAYPAL BUTTON*/}
            {!order.isPaid && (
              <Box>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </Box>
            )}
          </Flex>
        </Grid>
      </Flex>
    </>
  )
}

export default OrderScreen
