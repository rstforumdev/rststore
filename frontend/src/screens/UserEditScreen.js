// Copied from the Register Screen
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
  Link,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions' // STEP 62

const UserEditScreen = ({ match, history }) => {
  // new
  const userId = match.params.id // new

  const [name, setName] = useState('') // new
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('false') // new

  const dispatch = useDispatch()

  // NEW
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    // just check for any of the fields
    // if user doesn't exist or doesn't match the URL then refetch
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user, dispatch, setName, setEmail, setIsAdmin, userId])

  const submitHandler = e => {
    e.preventDefault()
  }

  return (
    <>
      <Link as={RouterLink} to='/admin/userlist'>
        Go Back
      </Link>
      <Flex w='full' alignItems='center' justifyContent='center' py='5'>
        <FormContainer>
          <Heading as='h1' mb='8' fontSize='3xl'>
            Edit User
          </Heading>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type='error'>{error}</Message>
          ) : (
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
              <FormControl id='isAdmin' isRequired>
                <FormLabel>Is Admin?</FormLabel>
                <Checkbox
                  size='lg'
                  colorScheme='teal'
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}>
                  Is Admin?
                </Checkbox>
              </FormControl>
              <Spacer h='3' />
              <Button
                isLoading={loading}
                type='submit'
                mt='4'
                colorScheme='teal'>
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  )
}

export default UserEditScreen
