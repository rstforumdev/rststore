// we need axios to make a request to /api/products/:id
// to get the data/fields for that particular product
import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

// id and qty we will get from the url param
// we will need to use thunk as we are making an async request
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // along with passing `dispatch` we will also pass `getState`
  // and this will allow us to get our entire state tree
  // so anything we want like productList, productDetails, cart, we can
  // get it using `getState`

  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  // After dispatching, we also want to store this in localStorage
  // getState().cart.cartItems -> will give us back a JavaScript object
  // and we can only store strings in the browser localStorage
  // hence we have to stringify it. And when we want to take it out and
  // read, we will have to parse it using JSON.parse
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
