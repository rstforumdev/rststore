import React from 'react'
import { Flex } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header />
      <Flex as='main' minH='xl' py='4' px='6'>
        <h1>Welcome to RST Store</h1>
      </Flex>
      <Footer />
    </>
  )
}

export default App
