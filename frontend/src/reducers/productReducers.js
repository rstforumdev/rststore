import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/productConstants.js'

// Handle state for the product list
// reducers takes two args, initial state and an action
// so we will DISPATCH ACTIONS to this reducer later on
// action is an object that has a type and an optional payload
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // product list request
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state // return the initial state
  }
}
