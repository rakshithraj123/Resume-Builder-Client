// npm modules
import {jwtDecode} from 'jwt-decode'
import { getToken,removeToken ,setToken} from '../redux/'

function setSessionToken(token) {
  setToken(token)
}

function getSessionToken() {
  let token = getToken()
  if (!token) return null
  const payload = jwtDecode(token)

  if (payload.exp < Date.now() / 1000) {
    removeSessionToken()
    token = null
  }

  return token
}

function getUserFromToken() {
  const token = getToken()
  let user =  token ? jwtDecode(token).users : null
  return token ? user : null
}

function removeSessionToken() {
   removeToken()
}

export { setSessionToken, getSessionToken, getUserFromToken, removeSessionToken }
