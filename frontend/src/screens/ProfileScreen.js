// Copied the LoginScreen and then modified it

import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Grid
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  // bring user login as if the user is not logged in
  // we don't him/her to see this page
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // If the user data/token already exists then just redirect
  // the user to where ever it is it wants to go
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        // this will get passed in id, but will hit the profile route.
        // That we get can have one action for both getting user by id
        // and hitting the profile endpoint
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, dispatch, user])

  const submitHandler = e => {
    e.preventDefault()
    // check if passwords are equal
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // TODO: DISPATCH UPDATE PROFILE
    }
  }

  return (
    <Grid gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr' }} py='5' gap='10'>
      <Flex
        bgColor='white'
        boxShadow='md'
        rounded='md'
        p='10'
        direction='column'>
        <Heading as='h2' mb='8' fontSize='3xl'>
          User Profile
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
            Update
          </Button>
        </form>
      </Flex>
      <Flex direction='column'>
        <Heading as='h2'>My Orders</Heading>
      </Flex>
    </Grid>
  )
}

export default ProfileScreen
