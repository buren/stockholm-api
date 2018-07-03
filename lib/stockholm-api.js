// API documentation
// http://api.stockholm.se/dokumentation/

// Documentation
// @see http://dataportalen.stockholm.se/dataportalen/GetMetaDataById?id=e3a1b523-7a39-4594-bc98-16ee6db582af

// Stockholm API endpoints

const fetch = require('node-fetch')
const Parsers = require('./endpoint-parsers')

const Endpoints = {
  FileInfos: {
    path: 'ServiceGuideService/FileInfos',
    parser: Parsers.parseFileInfo,
  },
  Files: {
    path: 'ServiceGuideService/Files',
    parser: Parsers.parseFile,
  },
  ImageFileInfos: {
    path: 'ServiceGuideService/ImageFileInfos',
    parser: Parsers.parseImageFileInfo,
  },
  ImageFiles: {
    path: 'ServiceGuideService/ImageFiles',
    parser: Parsers.parseImageFile,
  },
  GeographicalAreaInfos: {
    path: 'ServiceGuideService/GeographicalAreaInfos',
    parser: Parsers.parseGeoAreaInfo,
  },
  GeographicalAreas: {
    path: 'ServiceGuideService/GeographicalAreas',
    parser: Parsers.parseGeoArea,
  },
  ServiceUnitTypeGroupInfos: {
    path: 'ServiceGuideService/ServiceUnitTypeGroupInfos',
    parser: Parsers.parseServiceUnitTypeGroup,
  },
  ServiceUnitTypeGroups: {
    path: 'ServiceGuideService/ServiceUnitTypeGroups',
    parser: Parsers.parseServiceTypeGroup,
  },
  ServiceUnitTypeInfos: {
    path: 'ServiceGuideService/ServiceUnitTypeInfos',
    parser: Parsers.parseServiceUnitTypeInfo,
  },
  DetailedServiceUnits: {
    path: 'ServiceGuideService/DetailedServiceUnits',
    parser: Parsers.parseDetailedServiceUnit,
  },
  ServiceUnitInfos: {
    path: 'ServiceGuideService/ServiceUnitInfos',
    parser: Parsers.parseServiceUnitInfo,
  },
  ServiceUnits: {
    path: 'ServiceGuideService/ServiceUnits',
    parser: Parsers.parseServiceUnit,
  },
  ServiceUnitTypes: {
    path: 'ServiceGuideService/ServiceUnitTypes',
    parser: Parsers.parseServiceUnitType,
  },
  ServiceGuideService: {
    path: 'ServiceGuideService',
    parser: Parsers.parseServiceGuideService,
  },
}

class StockholmAPI {
  constructor(opts) {
    const options = opts || {}
    this.baseURL = options.baseURL || 'https://api.stockholm.se'
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
