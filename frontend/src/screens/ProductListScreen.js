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
import { IoPencilSharp, IoTrashBinSharp, IoAdd } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProducts,
  deleteProduct,
  createProduct
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  // Get the product list from the store
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  // Bring in the login state to get the current user login info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // We need this to get the success value on successful delete
  const productDelete = useSelector(state => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete

  // Step 67: Getting data from the state
  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET }) // STEP 67: Immediately dispatch the action

    // STEP 67: Refactor
    if (!userInfo.isAdmin) {
      history.push('/login') // redirect to login page if not an admin
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct
  ])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    // STEP 67: Create products
    dispatch(createProduct())
  }

  return (
    <>
      <Flex mb='5' alignItems='center' justifyContent='space-between'>
        <Heading as='h1' fontSize='3xl' mb='5'>
          Products
        </Heading>
        <Button onClick={createProductHandler} colorScheme='teal'>
          <Icon as={IoAdd} mr='2' fontSize='xl' fontWeight='bold' />
          Create Product
        </Button>
      </Flex>
      {/* Check for product delete loading and success and show approprite loader or message */}
      {loadingDelete && <Loader />}
      {errorDelete && <Message type='error'>{errorDelete}</Message>}
      {/* STEP 67: Loading and Error for Create */}
      {loadingCreate && <Loader />}
      {errorCreate && <Message type='error'>{errorDelete}</Message>}
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
                <Th>PRICE</Th>
                <Th>CATEGORY</Th>
                <Th>BRAND</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map(product => (
                <Tr key={product._id}>
                  <Td>{product._id}</Td>
                  <Td>{product.name}</Td>
                  <Td>₹{product.price}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.brand}</Td>
                  <Td>
                    <Flex justifyContent='flex-end' alignItems='center'>
                      <Button
                        mr='4'
                        as={RouterLink}
                        to={`/admin/product/${product._id}/edit`}
                        colorScheme='teal'>
                        <Icon as={IoPencilSharp} color='white' size='sm' />
                      </Button>
                      <Button
                        to={`/user/${product._id}/delete`}
                        colorScheme='red'
                        onClick={() => deleteHandler(product._id)}>
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

export default ProductListScreen
