import React from 'react'
import { Icon, Flex, Text, Box } from '@chakra-ui/react'
import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color = 'red.500' }) => {
  return (
    <Flex alignItems='flex-star' direction='column'>
      <Box>
        <Icon
          color={color}
          as={value >= 1 ? IoStar : value >= 0.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 2 ? IoStar : value >= 1.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 3 ? IoStar : value >= 2.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 4 ? IoStar : value >= 3.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 5 ? IoStar : value >= 4.5 ? IoStarHalf : IoStarOutline}
        />
      </Box>
      <Text ml='1'>{text && text}</Text>
    </Flex>
  )
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default Rating
