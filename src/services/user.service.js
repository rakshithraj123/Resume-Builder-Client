
import { AppService, HTTPHeaders } from '.'
import * as tokenService from './tokenService'
import aes from 'crypto-js/aes';
import {clearData,setLoggedIn,setResumeId} from '../redux/'

import {
  BASE_API_URL,
  LOGIN,
  REGISTER
} from '../constants'

const options = AppService.options()

export const userService = {
  login: async (data) => {

    var requestData = JSON.stringify({
      "email": data.email,
      "password": hashString(data.password)                                                                                                                                                                                           
    });
    let response = null
    console.log(requestData);
    response = await AppService.makeRequest(BASE_API_URL + LOGIN, {
      ...options,
      ...HTTPHeaders(),
      body: requestData,
    })

    let jsonResponse = response
    if (jsonResponse.data.User.token){
       let isAdmin = isAdminRole(jsonResponse.data.User.token)
       tokenService.setSessionToken(jsonResponse.data.User.token,isAdmin)
       if(!isAdmin){
        setResumeId(jsonResponse.data.User?.resumeId ?? null);
       }
       setLoggedIn(true)
    }
    return jsonResponse
  },
  getUser: () => {
    return tokenService.getUserFromToken()
  },
  logout: () => {
    clearData()
    return tokenService.removeSessionToken()
  },
  register: async (data) => {
    console.log(JSON.stringify(data))
    var requestData = JSON.stringify(
      {"firstName":data.firstName,
      "lastName":data.lastName,
      "email":data.email,
      "password": hashString(data.password),
      "phone":data.phoneNumber,
      "roleid":"1",
      "designation":data.designation
    })
    console.log(requestData)
    let response = null
    response = await AppService.makeRequest(BASE_API_URL + REGISTER, {
      ...options,
      ...HTTPHeaders(),
      body: requestData,
    })

    
    console.log(console.log(JSON.stringify(response)))
    return response
  },
}

/*const hashString = (textToHash) => {
  const saltRounds = 10
  const hash = bcrypt.hashSync(textToHash, saltRounds);
  console.log(hash);
  return hash;
}*/


const hashString = (plainText) => {
  const secretKey = process.env.REACT_APP_AUTH_PASSWORD_HASH_KEY;
  const cipherText = aes.encrypt(plainText, secretKey).toString()
  console.log(cipherText);
  return cipherText
}

function isAdminRole(token) {
  const decodedToken = token ? tokenService.getUserFromToken(token) : false;
  
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
