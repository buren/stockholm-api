// API documentation
// http://api.stockholm.se/dokumentation/

// Documentation
// @see http://dataportalen.stockholm.se/dataportalen/
// @see http://dataportalen.stockholm.se/dataportalen/GetMetaDataById?id=e3a1b523-7a39-4594-bc98-16ee6db582af

// Stockholm API endpoints

const fetch = require('node-fetch')
const Endpoints = require('./endpoints')

const isNumberOrString = (object) => {
  return typeof object === "number" || typeof object === "string"
}

class StockholmAPI {
  constructor(opts) {
    const options = opts || {}
    this.baseURL = options.baseURL || 'https://api.stockholm.se'

    const serviceGuideServiceAPIKey = options.ServiceGuideServiceAPIKey
    const placeServiceAPIKey = options.PlaceServiceAPIKey

    if (serviceGuideServiceAPIKey) {
      this.baseEndpoint = 'ServiceGuideService'
      this.apiKey = serviceGuideServiceAPIKey
    } else if (placeServiceAPIKey) {
      this.baseEndpoint = 'PlaceService'
      this.apiKey = placeServiceAPIKey
    } else {
      throw new Error('ServiceGuideServiceAPIKey OR PlaceServiceAPIKey option must be present')
    }

    if (serviceGuideServiceAPIKey && placeServiceAPIKey) {
      throw new Error('ServiceGuideServiceAPIKey AND PlaceServiceAPIKey can not be present, please instantiate this class twice instead')
    }
  }

  getService(service, params) {
    const endpoint = Endpoints[service]
    if (!endpoint) {
      throw new Error(`Unknown service ${service} - must be one of ${Object.keys(Endpoints).join(', ')}.`)
    }

    // Check for "index"
    if (endpoint.index === true && params === undefined) {
      return this.GET(this.buildServiceURL(endpoint.path), endpoint.parser)
    }

    // Check for resource id
    if (endpoint.ids.length !== 0) {
      if (isNumberOrString(params)) {
        return this.GET(this.buildServiceURL(`${endpoint.path}/${params}`), endpoint.parser)
      }

      const id = endpoint.ids.find((id) => params[id] !== undefined)
      if (id !== undefined) {
        return this.GET(this.buildServiceURL(`${endpoint.path}/${params[id]}`), endpoint.parser)
      }
    }

    // Check for relation filters
    const filter = endpoint.filters.find((filter) => params[filter] !== undefined)
    if (filter !== undefined) {
      const path = `${filter}/${params[filter]}/${endpoint.path}`
      return this.GET(this.buildServiceURL(path), endpoint.parser)
    }

    // At this point we've determined that the request params are "impossible"
    throw new Error(`Argument error - either no argument or one of ${(endpoint.ids.concat(endpoint.filters)).join(', ')} must be present`)
  }

  GET(url, parser) {
    if (!url)    throw new Error('url argument must be present!')
    if (!parser) throw new Error('parser argument must be present!')

    return fetch(url)
      .then((response) => response.json())
      .then((json) => parser(json))
  }

  buildServiceURL(path) {
    const parts = [this.baseURL, this.baseEndpoint]
    if (path) parts.push(path)

    return `${parts.join('/')}/json?apiKey=${this.apiKey}`
  }
}

// Add convenience functions for each endpoint
Object.keys(Endpoints).forEach((name) => {
  // Example: getPlaceService(params)
  StockholmAPI.prototype[`get${name}`] = function(params) {
    return this.getService(name, params)
  }
})

module.exports = StockholmAPI
