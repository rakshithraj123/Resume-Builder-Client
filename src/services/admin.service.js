import { AppService, HTTPHeaders } from ".";
import * as tokenService from "./tokenService";

import { BASE_API_URL, USERS } from "../constants";
import { json } from "react-router";

export const adminService = {
  userList: async (id) => {
    try {
      const options = AppService.optionsGET()
      let token = tokenService.getSessionToken();
      console.log(token);
      let httpRequestHeaders = {
        'Authorization': `Bearer ${token}`,
      };
      console.log(httpRequestHeaders);

      let response = null
      response = await AppService.makeRequest(BASE_API_URL + USERS, {
        ...options,
        headers: httpRequestHeaders
      })

      console.log("Response from users  \n", response);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }  
};
