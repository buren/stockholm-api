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
    this.serviceGuideServiceAPIKey = options.serviceGuideServiceAPIKey
    this.placeServiceAPIKey = options.placeServiceAPIKey

    if (!this.serviceGuideServiceAPIKey && !this.placeServiceAPIKey) {
      throw new Error('apiKey.placeServiceAPIKey or apiKey.placeServiceAPIKey option must be present')
    }
  }

  fetch(endpointName) {
    const endpoint = Endpoints[endpointName]
    if (!endpoint) {
       throw new Error(`no endpoint with name ${endpointName} found!`)
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
    return `${this.baseURL}/${path}/json?apiKey=${this.apiKeyFor(path)}`
  }

  apiKeyFor(path) {
    if (path.indexOf('ServiceGuideService') !== -1) {
      return this.serviceGuideServiceAPIKey
    } else if (path.indexOf('PlaceService') !== -1) {
      return this.placeServiceAPIKey
    } else {
      return null
    }
  }
}

module.exports = StockholmAPI
