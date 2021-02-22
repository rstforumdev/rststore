import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Link, Image, Flex, Heading, Text } from '@chakra-ui/react'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: 'none' }}>
      <Box
        maxW='sm'
        borderRadius='lg'
        borderWidth='1px'
        bgColor='white'
        overflow='hidden'
        transition='all'
        shadow='sm'
        _hover={{
          shadow: 'md'
        }}>
        <Image
          src={product.image}
          alt={product.name}
          h='380px'
          w='full'
          objectFit='cover'
        />
        <Flex
          px={5}
          py={4}
          direction='column'
          justifyContent='space-between'
          h='32'>
          <Heading as='h4' fontSize='lg' mb='3'>
            {product.name}
          </Heading>
          <Flex alignItems='flex-end' justifyContent='space-between'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <Text fontSize='2xl' fontWeight='medium' color='teal.600'>
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}

export default Product
