import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../constants/userConstants'

// Login action to make a request and get a token
export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    // Set request headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    // Set user to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      // copied form other file
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
