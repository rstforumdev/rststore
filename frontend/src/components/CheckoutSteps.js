import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Flex
} from '@chakra-ui/react'
import { IoCaretForwardSharp } from 'react-icons/io5'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex justifyContent='center' mb='8'>
      <Breadcrumb separator={<IoCaretForwardSharp color='gray.500' />}>
        <BreadcrumbItem fontSize='lg'>
          {step1 ? (
            <BreadcrumbLink as={RouterLink} to='/login'>
              Login
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color='gray.400'
              _hover={{ textDeco: 'none' }}>
              Login
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbItem fontSize='lg'>
          {step2 ? (
            <BreadcrumbLink as={RouterLink} to='/shipping'>
              Shipping
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color='gray.400'
              _hover={{ textDeco: 'none' }}>
              Shipping
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbItem fontSize='lg'>
          {step3 ? (
            <BreadcrumbLink as={RouterLink} to='/payment'>
              Payment
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color='gray.400'
              _hover={{ textDeco: 'none' }}>
              Payment
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbItem fontSize='lg'>
          {step4 ? (
            <BreadcrumbLink as={RouterLink} to='/placeorder'>
              Place Order
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              disabled
              color='gray.400'
              _hover={{ textDeco: 'none' }}>
              Place Order
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  )
}

export default CheckoutSteps
