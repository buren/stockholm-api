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

const identity = (value) => value

class StockholmAPI {
  constructor(opts) {
    const defaultOptions = { parse: true, baseURL: 'https://api.stockholm.se' }
    const options = Object.assign(defaultOptions, opts || {})

    this.baseURL = options.baseURL
    this.parse = options.parse

    const serviceGuideServiceAPIKey = options.ServiceGuideServiceAPIKey
    const placeServiceAPIKey = options.PlaceServiceAPIKey

    // TODO: Find a clean way to support both PlaceService and ServiveGuideService on
    // the same api instance - currently we require two separate instances to be created
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

    const parser = this.parse === false ? identity : endpoint.parser
    if (!parser) throw new Error('parser argument must be present!')

    const url = this.buildServiceURL(endpoint, params)
    return new Promise((resolve, reject) => {
      // If the endpoint returns a blob, return the URL instead of fetching it
      if (endpoint.type === 'file') {
        resolve(parser(url))
        return
      }

      this.GET(url)
        .then((response) => response.json())
        .then((data) => resolve(parser(data)))
        .catch((error) => reject(error))
    })
  }

  GET(url) {
    if (!url) throw new Error('url argument must be present!')

    return fetch(url)
  }

  buildServiceURL(endpoint, params) {
    const parts = [
      this.baseURL,
      this.baseEndpoint,
      this.buildServicePath(endpoint, params)
    ]

    return `${parts.join('/')}?apiKey=${this.apiKey}`
  }

  buildServicePath(endpoint, params) {
    const pathSuffix = endpoint.type === 'file' ? 'Data' : 'json'

    // Check for "index" route
    if (endpoint.index === true && params === undefined) {
      // No need to add the endpoint path here since it will be added in #buildServiceURL
      return pathSuffix
    }

    // Check for resource id(s)
    if (endpoint.ids.length !== 0) {
      if (isNumberOrString(params)) {
        return [endpoint.path, params, pathSuffix].join('/')
      }

      const id = endpoint.ids.find((id) => params[id] !== undefined)
      if (id !== undefined) {
        return [endpoint.path, params[id], pathSuffix].join('/')
      }
    }

    // Check for relation filters
    const filter = endpoint.filters.find((filter) => params[filter] !== undefined)
    if (filter !== undefined) {
      return [filter, params[filter], endpoint.path, pathSuffix].join('/')
    }

    // At this point we've determined that the request params are "impossible"
    throw new Error(`Argument error - either no argument or one of ${(endpoint.ids.concat(endpoint.filters)).join(', ')} must be present`)
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
