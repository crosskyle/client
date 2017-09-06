import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
  // Allowed by redux-thunk, access to dispatch method directly
  return function (dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email: email, password: password })
      .then(response => {
        // update state to indicate user is auth'd
        dispatch({ type: AUTH_USER })

        // save the JWT token
        localStorage.setItem('token', response.data.token)

        // redirect to the route '/feature'
        browserHistory.push('/feature')
      })
      .catch(() => {
        // show error to the user
        dispatch(authError('Bad Login Info'))
      })
  }
}

export function signoutUser() {
  localStorage.removeItem('token')

  return {
    type: UNAUTH_USER,
  }
}

export function signupUser({ email, password }) {
  // Allowed by redux-thunk, access to dispatch method directly
  return function (dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signup`, { email: email, password: password })
      .then(response => {
        // update state to indicate user is auth'd
        dispatch({ type: AUTH_USER })

        // save the JWT token
        localStorage.setItem('token', response.data.token)

        // redirect to the route '/feature'
        browserHistory.push('/feature')
      })
      .catch(() => {
        // show error to the user
        dispatch(authError('Email is in use'))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

// request to backend for protected routes
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
