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
import { listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserListScreen = () => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  const deleteHandler = () => {
    console.log('Delete')
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
