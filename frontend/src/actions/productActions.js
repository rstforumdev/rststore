import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/productConstants.js'

// We need Redux thunk here to add a function within a function
export const listProducts = () => async dispatch => {
  try {
    // dispatching this will make the reducer function to happen
    dispatch({ type: PRODUCT_LIST_REQUEST })

    //. make the request
    const { data } = await axios.get('/api/products')

    // dispatch the success action
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
