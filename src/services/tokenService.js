// npm modules
import {jwtDecode} from 'jwt-decode'
import { getToken,removeToken ,setToken} from '../redux/'
import {clearData} from '../redux/'

function setSessionToken(token,isAdmin) {
  setToken(token, isAdmin)
}

function getSessionToken() {
  let token = getToken()
  if (!token) {
    clearData()
    return null
  }
  const payload = jwtDecode(token)

  if (payload.exp < Date.now() / 1000) {
    removeSessionToken()
    clearData()
    token = null
  }

  return token
}


function getUserFromToken(token) {
  const _token = token ?? getSessionToken()
  let user =  _token ? jwtDecode(_token).users : null
  console.log(user)
  return _token ? user : null
}

function removeSessionToken() {
   removeToken()
}

export { setSessionToken, getSessionToken, getUserFromToken, removeSessionToken }
