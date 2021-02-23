// Copied the LoginScreen and then modified it

import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spacer
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions' // import register action

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('') // new
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // new
  const [message, setMessage] = useState(null) // new

  // functionality
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister) // new
  const { loading, error, userInfo } = userRegister // new

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
    // check if passwords are equal
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // DISPATCH REGISTER
      dispatch(register(name, email, password, confirmPassword))
    }
  }

  return (
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
      <FormContainer>
        <Heading as='h1' mb='8' fontSize='3xl'>
          Sign Up
        </Heading>
        {message && <Message type='error'>{message}</Message>}
        {error && <Message type='error'>{error}</Message>}
        <form onSubmit={submitHandler}>
          <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              placeholder='Enter Full Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />
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
          <Spacer h='3' />
          <FormControl id='confirmPassword' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter password Again'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button isLoading={loading} type='submit' mt='4' colorScheme='teal'>
            Register
          </Button>
        </form>
        <Flex pt='5'>
          <Text fontWeight='semibold'>
            Have an account?{' '}
            <Link
              as={RouterLink}
              to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export default RegisterScreen
