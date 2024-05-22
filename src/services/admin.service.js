import { AppService, HTTPHeaders } from ".";
import { BASE_API_URL, SEARCHLIST } from "../constants";
import * as tokenService from "./tokenService";

const options = AppService.options()

export const adminService = {
  userList: async (data) => {
    try{
    console.log(JSON.stringify(data))
    if (typeof data !== 'object' || data === null) {
      throw new TypeError('Expected data to be an object');
    }
    var requestData = JSON.stringify({
      "startPage": data.startPage,
      "endPage": data.endPage,
      "rowCount": data.rowCount,
      "searchTerm":data.searchTerm,
    });
    let token = tokenService.getSessionToken();
    console.log(token);
    console.log(requestData)
      let httpRequestHeaders = {
        ...HTTPHeaders().headers,
        'Authorization': `Bearer ${token}`,
      };
    let response = null
    response = await AppService.makeRequest(BASE_API_URL + SEARCHLIST, {
      ...options,
      headers: httpRequestHeaders,
      body: requestData,
    })    
    console.log(response)
    return response
  } catch (error) {
    console.error('Error in userList:', error);
    throw error; // Re-throw the error after logging it
  }
  }  
};
