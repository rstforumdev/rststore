import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Flex, Container } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <Container maxW='8xl'>
        <Flex mt='72px' as='main' minH='xl' py='6' px='6' direction='column'>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
        </Flex>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
