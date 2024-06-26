import { AppService, HTTPHeaders } from ".";
import * as tokenService from "./tokenService";

import { BASE_API_URL, CREATERESUME, FETCHRESUME,UPDATERESUME } from "../constants";
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
  fetch: async (id,abortController) => {
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
      },
      abortController)

      console.log("Response from create \n", response);
      console.log("Response from create id is \n", response.data.Resume._id);
      console.log("\n Resume respone is \n", response.data.Resume.content);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  update: async (data,resumeId) => {
    var requestData = JSON.stringify({
      'content': data,
    });
    try {
      const options = AppService.optionsPUT();
      let token = tokenService.getSessionToken();
      console.log(token);
      let httpRequestHeaders = {
        ...HTTPHeaders().headers,
        'Authorization': `Bearer ${token}`,
      };
      console.log(httpRequestHeaders);
      console.log(requestData);

      let response = null
      response = await AppService.makeRequest(BASE_API_URL + UPDATERESUME+"/"+resumeId, {
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
};
