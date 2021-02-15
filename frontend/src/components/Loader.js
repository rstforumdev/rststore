import React from 'react'
import { Spinner, Flex } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Flex alignItems='center' justifyContent='center'>
      <Spinner size='xl' label='Loading'></Spinner>
    </Flex>
  )
}

export default Loader
