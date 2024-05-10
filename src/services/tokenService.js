// npm modules
import {jwtDecode} from 'jwt-decode'
import { getToken,removeToken ,setToken} from '../redux/'

function setSessionToken(token) {
  setToken(token, isAdminRole(token))
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
function isAdminRole(token) {
  const decodedToken = token ? jwtDecode(token) : false;
  
  if (decodedToken) {
    const roleId = decodedToken.roleid;
    if (roleId === "1") {
      return false;
    } else if (roleId === "2") {
      return true;
    }
  }
  return false;
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
