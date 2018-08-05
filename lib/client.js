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
    this.serviceBaseURL = `${this.baseURL}/ServiceGuideService`
    this.placeBaseURL = `${this.baseURL}/PlaceService`

    this.ServiceGuideServiceAPIKey = options.ServiceGuideServiceAPIKey
    this.PlaceServiceAPIKey = options.PlaceServiceAPIKey

    if (!this.ServiceGuideServiceAPIKey && !this.PlaceServiceAPIKey) {
      throw new Error('apiKey.PlaceServiceAPIKey or apiKey.PlaceServiceAPIKey option must be present')
    }
  }

  getServiceGuideService() {
    return this.getService('ServiceGuideService')
  }

  getDetailedServiceUnits(params) {
    return this.getService('DetailedServiceUnits', params)
  }

  getFileInfos(params) {
    return this.getService('FileInfos', params)
  }

  getFiles(params) {
    return this.getService('Files', params)
  }

  getGeographicalAreaInfos(params) {
    return this.getService('GeographicalAreaInfos', params)
  }

  getGeographicalAreas(params) {
    return this.getService('GeographicalAreas', params)
  }

  getServiceUnitInfos(params) {
    return this.getService('ServiceUnitInfos', params)
  }

  getServiceUnits(params) {
    return this.getService('ServiceUnits', params)
  }

  getImageFileInfos(params) {
    return this.getService('ImageFileInfos', params)
  }

  getImageFiles(params) {
    return this.getService('ImageFiles', params)
  }

  getAttributes(params) {
    return this.getService('Attributes', params)
  }

  getServiceUnitTypeGroups(params) {
    return this.getService('ServiceUnitTypeGroups', params)
  }

  getServiceUnitTypeInfos(params) {
    return this.getService('ServiceUnitTypeInfos', params)
  }

  getServiceUnitTypes(params) {
    return this.getService('ServiceUnitTypes', params)
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
    if (path) {
      path = `${this.serviceBaseURL}/${path}`
    } else {
      path = this.serviceBaseURL
    }

    return `${path}/json?apiKey=${this.apiKeyFor(path)}`
  }

  apiKeyFor(path) {
    if (path.indexOf('ServiceGuideService') !== -1) {
      return this.ServiceGuideServiceAPIKey
    } else if (path.indexOf('PlaceService') !== -1) {
      return this.PlaceServiceAPIKey
    } else {
      return null
    }
  }
}

module.exports = StockholmAPI
