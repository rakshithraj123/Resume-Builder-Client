
import { AppService, HTTPHeaders } from '.'
import * as tokenService from './tokenService'
import aes from 'crypto-js/aes';
import {clearData,setLoggedIn} from '../redux/'

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
       tokenService.setSessionToken(jsonResponse.data.User.token)
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
      "roleid":"1"
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
  const secretKey = "ReactNodejs"
  const cipherText = aes.encrypt(plainText, secretKey).toString()
  console.log(cipherText);
  return cipherText
}
