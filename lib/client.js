// API documentation
// http://api.stockholm.se/dokumentation/

// Documentation
// @see http://dataportalen.stockholm.se/dataportalen/
// @see http://dataportalen.stockholm.se/dataportalen/GetMetaDataById?id=e3a1b523-7a39-4594-bc98-16ee6db582af

// Stockholm API endpoints

const fetch = require('cross-fetch')
const Endpoints = require('./endpoints')
const identity = (value) => value

class StockholmAPI {
  constructor(opts) {
    const defaultOptions = { baseURL: 'https://api.stockholm.se' }
    const options = Object.assign(defaultOptions, opts || {})

    this.baseURL = options.baseURL

    const serviceGuideServiceAPIKey = options.ServiceGuideServiceAPIKey
    const placeServiceAPIKey = options.PlaceServiceAPIKey

    if (serviceGuideServiceAPIKey) {
      this.baseService = Endpoints.get('ServiceGuideService').path
      this.apiKey = serviceGuideServiceAPIKey
    } else if (placeServiceAPIKey) {
      this.baseService = Endpoints.get('PlaceService').path
      this.apiKey = placeServiceAPIKey
    } else {
      throw new Error('ServiceGuideServiceAPIKey OR PlaceServiceAPIKey option must be present')
    }

    if (serviceGuideServiceAPIKey && placeServiceAPIKey) {
      throw new Error('ServiceGuideServiceAPIKey AND PlaceServiceAPIKey can not be present, please instantiate this class twice instead')
    }
  }

  getService(service, params) {
    const endpoint = Endpoints.get(service)
    const url = this.buildURL(endpoint, params)

    return new Promise((resolve, reject) => {
      // If the endpoint returns a blob, return the URL instead of fetching it
      if (endpoint.type === 'file') {
        resolve(url)
        return
      }

      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  buildURL(endpoint, params) {
    return Endpoints.buildURL(
      this.baseURL,
      this.baseService,
      this.apiKey,
      endpoint,
      params,
    )
  }
}

// Add convenience functions for each endpoint
Endpoints.serviceNames().forEach((name) => {
  // Example: getPlaceService(params)
  StockholmAPI.prototype[`get${name}`] = function(params) {
    return this.getService(name, params)
  }
})

module.exports = StockholmAPI
