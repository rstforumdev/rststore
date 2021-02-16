import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer
} from './reducers/productReducers.js'

const reducer = combineReducers({
  productList: productListReducer, // productList will be a state variable
  productDetails: productDetailsReducer // create another part of the state
  // add the above first and then see this state in the devtools
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
