import React from 'react'
import { Flex } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header />
      <Flex mt='72px' as='main' minH='xl' py='6' px='6' direction='column'>
        <HomeScreen />
      </Flex>
      <Footer />
    </>
  )
}

export default App
