import { AppService, HTTPHeaders } from ".";
import * as tokenService from "./tokenService";

import { BASE_API_URL, CREATERESUME, FETCHRESUME } from "../constants";
import { json } from "react-router";

export const resumeAddService = {
  create: async (data) => {
    var requestData = JSON.stringify({
      'content': data,
    });
    try {
      const options = AppService.options();
      let token = tokenService.getSessionToken();
      console.log(token);
      let httpRequestHeaders = {
        ...HTTPHeaders().headers,
        'Authorization': `Bearer ${token}`,
      };
      console.log(httpRequestHeaders);
      console.log(requestData);

      let response = null
      response = await AppService.makeRequest(BASE_API_URL + CREATERESUME, {
        ...options,
        headers: httpRequestHeaders,
        body: requestData,
      })

      console.log("Response from create \n", response);
      console.log("Response from create id is \n", response.data.Resume._id);
      console.log("\n Resume respone is \n", response.data.Resume.content);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  fetch: async (id) => {
    try {
      const options = AppService.optionsGET()
      let token = tokenService.getSessionToken();
      console.log(token);
      let httpRequestHeaders = {
        'Authorization': `Bearer ${token}`,
      };
      console.log(httpRequestHeaders);

      let response = null
      response = await AppService.makeRequest(BASE_API_URL + FETCHRESUME + id, {
        ...options,
        headers: httpRequestHeaders
      })

      console.log("Response from create \n", response);
      console.log("Response from create id is \n", response.data.Resume._id);
      console.log("\n Resume respone is \n", response.data.Resume.content);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
};
