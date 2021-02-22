import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Link,
  Spacer
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = e => {
    e.preventDefault()
    // DISPATCH LOGIN
  }

  return (
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
      <FormContainer>
        <Heading as='h1' mb='8' fontSize='3xl'>
          Login
        </Heading>
        <form onSubmit={submitHandler}>
          <FormControl id='email' isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />
          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type='submit' mt='4' colorScheme='teal'>
            Login
          </Button>
        </form>
        <Flex pt='5'>
          <Text fontWeight='semibold'>
            New Customer?{' '}
            <Link
              as={RouterLink}
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export default LoginScreen
