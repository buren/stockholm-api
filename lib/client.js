// API documentation
// http://api.stockholm.se/dokumentation/

// Documentation
// @see http://dataportalen.stockholm.se/dataportalen/GetMetaDataById?id=e3a1b523-7a39-4594-bc98-16ee6db582af

// Stockholm API endpoints

const fetch = require('node-fetch')
const Endpoints = require('./endpoints')

class StockholmAPI {
  constructor(opts) {
    const options = opts || {}
    this.baseURL = options.baseURL || 'https://api.stockholm.se'
    // TOOD: Support both serviceGuideServiceAPIKey and placeServiceAPIKey
    this.apiKey = options.apiKey

    if (!this.apiKey) {
      throw new Error('apiKey option must be present!')
    }
  }

  fetch(endpointName) {
    const endpoint = Endpoints[endpointName]
    if (!endpoint) {
       new Error(`no endpoint with name ${endpointName} found!`)
    }

    const url = this.buildURL(endpoint.path)

    let response;
    return fetch(url)
      .then((res) => {
        response = res
        return response.json()
      }).then((json) => {
        return { response: response, json: json }
      })
  }

  buildURL(path) {
    return `${this.baseURL}/${path}/json?apiKey=${this.apiKey}`
  }
}

module.exports = StockholmAPI
