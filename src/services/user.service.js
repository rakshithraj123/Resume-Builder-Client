
import { AppService, HTTPHeaders } from '.'
import * as tokenService from './tokenService'

import {
  BASE_API_URL,
  LOGIN,
} from '../constants'

const options = AppService.options()

export const userService = {
  login: async (data) => {

    var requestData = JSON.stringify({
      "email": data.email,
      "password": data.password
    });
    let response = null
    response = await AppService.makeRequest(BASE_API_URL + LOGIN, {
      ...options,
      ...HTTPHeaders(),
      body: requestData,
    })

    let jsonResponse = response
    if (jsonResponse.token) 
       tokenService.setSessionToken(jsonResponse.token)
    console.log(tokenService.getSessionToken())

    // let response = {"token":"dfzkljkvcvk"}
    // if (response.token) 
    //   tokenService.setSessionToken(response.token)

    //   console.log(tokenService.getSessionToken())
    return jsonResponse
  },
  getUser:  () => {
    return tokenService.getUserFromToken()
  },
  logout :  () => {
    return tokenService.removeSessionToken()
  }
}


