import axios from 'axios'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
  // Allowed by redux-thunk
  return function (dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })

    // If request is good
    // - update state to indicate user is auth'd
    // - save the JWT token
    // - redirect to the route '/feature'

    // If request is bad
    // - show error to the user
  }
}