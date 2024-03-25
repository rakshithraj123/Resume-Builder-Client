export const AppService = {
  /**
   * Set http options
   * Default: POST, application/json
   * @default method POST
   * @default credentials 'include' required to accept and send cookies
   */
  options: () => {
    return {
      method: 'POST',
    }
  },

  /**
   * Set http options
   * Default: GET, application/json
   * @default method GET
   * @default credentials 'include' required to accept and send cookies
   */
  optionsGET: () => {
    return {
      method: 'GET'
    }
  },

  /**
   * Make a fetch API call
   * @param {string} url fully qualified url
   * @param {object} requestOptions options object from options()
   */

  makeRequest: async (url, requestOptions) => {
  console.log(url)
    const response = await fetch(url, requestOptions)
    let result = null

    if (!(response.error && response.error.name === 'AbortError')) {
      try {
        result = await response.json()
      } catch (error) {
        console.log(response.status); 
        console.log(response)
        throw response
      }
    } else {
      throw response
    }

    if (response.status >= 400) {
      console.log(response.status); 
      throw result
    }
    return result
  }
}

/**
 * Sets HTTP Headers with Authorization key
 * @returns {object} headers
 */
export const HTTPHeaders = () => {
  return {
    headers: {
      'Content-type': 'application/json',
    }
  }
}
