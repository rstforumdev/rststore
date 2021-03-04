import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box
} from '@chakra-ui/react'
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBinSharp
} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUsers } from '../actions/userActions' // STEP 60: IMPORT deleteUsers
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  // Bring in the login state to get the current user login info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // STEP 60 -> check for the success key
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login') // redirect to login page if not an admin
    }
  }, [dispatch, history, userInfo, successDelete])
  // STEP 60: above we pass successDelete because if that changes we want
  // useEffect to run again and re-render the component with less no. of users

  const deleteHandler = id => {
    // STEP 60:
    // dispatch(deleteUsers(id)) // first just show this, then show with window.confirm
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUsers(id))
    }
  }

  return (
    <>
      <Heading as='h1' fontSize='3xl' mb='5'>
        Users
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='error'>{error}</Message>
      ) : (
        <Box bgColor='white' rounded='lg' shadow='lg' px='5' py='5'>
          <Table variant='striped' colorScheme='gray' size='sm'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>EMAIL</Th>
                <Th>ADMIN</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Td>
                  <Td>
                    {user.isAdmin ? (
                      <Icon
                        as={IoCheckmarkCircleSharp}
                        color='green.600'
                        w='8'
                        h='8'
                      />
                    ) : (
                      <Icon
                        as={IoCloseCircleSharp}
                        color='red.600'
                        w='8'
                        h='8'
                      />
                    )}
                  </Td>
                  <Td>
                    <Flex justifyContent='flex-end' alignItems='center'>
                      <Button
                        mr='4'
                        as={RouterLink}
                        to={`/user/${user._id}/edit`}
                        colorScheme='teal'>
                        <Icon as={IoPencilSharp} color='white' size='sm' />
                      </Button>
                      <Button
                        to={`/user/${user._id}/edit`}
                        colorScheme='red'
                        onClick={() => deleteHandler(user._id)}>
                        <Icon as={IoTrashBinSharp} color='white' size='sm' />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  )
}

export default UserListScreen
