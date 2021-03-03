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
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Link
} from '@chakra-ui/react'
import { IoWarning } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions' // NEW -> STEP 55

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

  // GET THE SUCCESS value from the state. If true we can show a message
  // to the user saying profile was successfully updated
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  // NEW -> STEP 55
  const orderMyList = useSelector(state => state.orderMyList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

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
        dispatch(listMyOrders()) // NEW -> STEP 55
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
      // DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({ id: user._id, name, email, password })) // because _id will be invalid
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
        {success && <Message type='success'>Profile updated</Message>}
        <form onSubmit={submitHandler}>
          <FormControl id='name'>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              placeholder='Enter Full Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />
          <FormControl id='email'>
            <FormLabel>Email Address</FormLabel>
            <Input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />
          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />
          <FormControl id='confirmPassword'>
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
        <Heading as='h2' mb='8'>
          My Orders
        </Heading>
        {/* NEW -> STEP 55 */}
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type='error'>{errorOrders}</Message>
        ) : (
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map(order => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  {/* Substring. We just want the first 10 characters */}
                  <Td>{order.createdAt.substring(0, 10)}</Td>
                  <Td>{order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Icon as={IoWarning} color='red' />
                    )}
                  </Td>
                  <Td>
                    {order.isDelivered ? (
                      order.deleveredAt.substring(0, 10)
                    ) : (
                      <Icon as={IoWarning} color='red' />
                    )}
                  </Td>
                  <Td>
                    <Link as={RouterLink} to={`/order/${order._id}`}>
                      <Button colorScheme='teal' size='sm'>
                        Details
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Grid>
  )
}

export default ProfileScreen
