import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      // find if product already exists in the cart
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ) // map through the current cart items
          // for each item (x) in the existing cart check if it's
          // product (id) is equal to the new item, if it is,
          // then return this item, else just keep it as it
        }
      } else {
        // if it doesn't exist push it the cartItems array
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    default:
      return state
  }
}
