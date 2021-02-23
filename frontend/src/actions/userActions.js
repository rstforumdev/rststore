import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
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

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    // Set request headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

    // Immediately login the user upon registration
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    // Set user to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      // copied form other file
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// getState gives the state -> we can get the token from here
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState() // two level destructuring

    // Set request headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
