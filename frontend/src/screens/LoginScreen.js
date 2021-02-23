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
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // functionality
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  // If the user data/token already exists then just redirect
  // the user to where ever it is it wants to go
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    // DISPATCH LOGIN
    dispatch(login(email, password))
  }

  return (
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
      <FormContainer>
        <Heading as='h1' mb='8' fontSize='3xl'>
          Login
        </Heading>
        {error && <Message type='error'>{error}</Message>}
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
          <Button isLoading={loading} type='submit' mt='4' colorScheme='teal'>
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
