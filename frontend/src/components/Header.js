import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {
  Flex,
  Heading,
  Link,
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { IoChevronDown } from 'react-icons/io5'
import { HiShoppingBag, HiOutlineMenuAlt3, HiUser } from 'react-icons/hi'
import { logout } from '../actions/userActions'

const MenuItems = ({ children, url }) => (
  <Link
    as={RouterLink}
    to={url}
    mt={{ base: 4, md: 0 }}
    fontSize='sm'
    fontWeight='medium'
    letterSpacing='wide'
    color='whiteAlpha.600'
    textTransform='uppercase'
    _hover={{ color: 'whiteAlpha.800' }}
    mr={5}
    display='block'>
    {children}
  </Link>
)

const Header = () => {
  const [show, setShow] = useState(false)

  // dispatch func
  const dispatch = useDispatch()

  // Get access to the userInfo state
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = e => {
    dispatch(logout())
  }

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      wrap='wrap'
      py='6'
      px='6'
      background='gray.800'
      shadow='md'
      pos='fixed'
      w='100%'
      top='0'
      zIndex={2}>
      <Flex align='center' mr={5}>
        <Heading
          as='h1'
          color='whiteAlpha.800'
          fontWeight='medium'
          size='md'
          letterSpacing='wider'
          mr={{ md: '1rem', base: 0 }}>
          <Link
            as={RouterLink}
            _hover={{ color: 'whiteAlpha.700', textDecor: 'none' }}
            to='/'>
            RST STORE
          </Link>
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }}>
        <Icon
          color='white'
          as={HiOutlineMenuAlt3}
          w={6}
          h={6}
          onClick={() => setShow(!show)}
        />
        <title>Menu</title>
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems='center'>
        <MenuItems url='/cart'>
          <Flex alignItems='center'>
            <Icon as={HiShoppingBag} w={4} h={4} mr='1' />
            Cart
          </Flex>
        </MenuItems>
        {/* Logic to handle showing */}
        {userInfo ? (
          <Menu>
            <MenuButton
              as={Link}
              color='white'
              fontSize='sm'
              fontWeight='semibold'
              _hover={{ textDecoration: 'none', opacity: '0.7' }}
              textTransform='uppercase'>
              {userInfo.name} <Icon as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to='/profile'>
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <MenuItems url='/login'>
            <Flex alignItems='center'>
              <Icon as={HiUser} w={4} h={4} mr='1' /> Sign In
            </Flex>
          </MenuItems>
        )}
        {/* Logic to handle showing */}
        {userInfo && userInfo.isAdmin && (
          <Menu>
            <MenuButton
              ml='5'
              as={Link}
              color='white'
              fontSize='sm'
              fontWeight='semibold'
              _hover={{ textDecoration: 'none', opacity: '0.7' }}
              textTransform='uppercase'>
              Manage <Icon as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to='/admin/userlist'>
                All Users
              </MenuItem>
              <MenuItem as={RouterLink} to='/admin/productlist'>
                All Products
              </MenuItem>
              <MenuItem as={RouterLink} to='/admin/orderlist'>
                All Orders
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  )
}

export default Header
