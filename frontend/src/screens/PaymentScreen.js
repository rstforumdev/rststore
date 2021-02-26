// Copied from ShippingScreen and then edited

import React, { useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  // redirect if no shipping address
  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Heading as='h1' mb='8' fontSize='3xl'>
          Payment Method
        </Heading>
        <form onSubmit={submitHandler}>
          <FormControl as='fieldset'>
            <FormLabel as='legend'>Select Method</FormLabel>
            <RadioGroup defaultValue={paymentMethod}>
              <HStack spacing='24px'>
                <Radio
                  value='paypal'
                  onChange={e => setPaymentMethod(e.target.value)}>
                  Paypal or Credit/Debit card
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          {/* Button */}
          <Button type='submit' mt='4' colorScheme='teal'>
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  )
}

export default PaymentScreen
