const Parsers = require('./endpoint-parsers')

const isNumberOrString = (object) => {
  return typeof object === "number" || typeof object === "string"
}

const Endpoints = {
  __routes: {
    FileInfos: {
      index: true,
      path: 'FileInfos',
      parser: Parsers.fileInfo,
      ids: [],
      filters: ['ServiceUnits'],
    },
    Files: {
      index: true,
      path: 'Files',
      parser: Parsers.file,
      ids: ['id'],
      filters: ['ServiceUnits'],
    },
    FilesData: {
      index: false,
      type: 'file',
      path: 'Files',
      parser: Parsers.fileData,
      ids: ['id'],
      filters: [],
    },
    ImageFileInfos: {
      index: true,
      path: 'ImageFileInfos',
      parser: Parsers.imageFileInfo,
      ids: [],
      filters: ['ServiceUnits']
    },
    ImageFiles: {
      index: true,
      path: 'ImageFiles',
      parser: Parsers.imageFile,
      ids: ['id'],
      filters: ['ServiceUnits']
    },
    ImageFilesData: {
      index: false,
      type: 'file',
      path: 'ImageFiles',
      parser: Parsers.fileData,
      ids: ['id'],
      filters: [],
    },
    GeographicalAreaInfos: {
      index: true,
      path: 'GeographicalAreaInfos',
      parser: Parsers.geoAreaInfo,
      ids: [],
      filters: ['ServiceUnits'],
    },
    GeographicalAreas: {
      index: true,
      path: 'GeographicalAreas',
      parser: Parsers.geoArea,
      ids: ['id', 'friendlyId', 'name'],
      filters: ['ServiceUnits'],
    },
    ServiceUnitTypeGroupInfos: {
      index: true,
      path: 'ServiceUnitTypeGroupInfos',
      parser: Parsers.serviceUnitTypeGroup,
      ids: [],
      filters: ['ServiceUnits'],
    },
    ServiceUnitTypeGroups: {
      index: true,
      path: 'ServiceUnitTypeGroups',
      parser: Parsers.serviceTypeGroup,
      ids: ['id', 'name'],
      filters: ['ServiceUnits'],
    },
    ServiceUnitTypeInfos: {
      index: true,
      path: 'ServiceUnitTypeInfos',
      parser: Parsers.serviceUnitTypeInfo,
      ids: [],
      filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
    },
    DetailedServiceUnits: {
      index: true,
      path: 'DetailedServiceUnits',
      parser: Parsers.detailedServiceUnit,
      ids: ['id', 'name'],
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes']
    },
    ServiceUnitInfos: {
      index: true,
      path: 'ServiceUnitInfos',
      parser: Parsers.serviceUnitInfo,
      ids: [],
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
    },
    RelatedServiceUnitInfos: {
      index: false,
      path: 'RelatedServiceUnitInfos',
      parser: Parsers.serviceUnitInfo,
      ids: [],
      filters: ['ServiceUnits'],
    },
    ServiceUnits: {
      index: true,
      path: 'ServiceUnits',
      parser: Parsers.serviceUnit,
      ids: ['id', 'name'],
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
    },
    ServiceUnitsCount: {
      index: true,
      path: 'ServiceUnits/Count',
      parser: Parsers.serviceUnitCount,
      ids: [],
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
    },
    RelatedServiceUnits: {
      index: false,
      path: 'RelatedServiceUnits',
      parser: Parsers.serviceUnit,
      ids: ['id', 'name'],
      filters: [],
    },
    ServiceUnitTypes: {
      index: true,
      path: 'ServiceUnitTypes',
      parser: Parsers.serviceUnitType,
      ids: ['id'],
      filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
    },
    Attributes: {
      index: false,
      path: 'Attributes',
      parser: Parsers.attributes,
      ids: [],
      filters: ['ServiceUnits']
    },
    ServiceGuideService: {
      index: true,
      path: 'ServiceGuideService', // root path
      parser: Parsers.serviceGuideService,
      ids: [],
      filters: []
    },
    PlaceService: {
      index: true,
      path: 'PlaceService', // root path
      parser: Parsers.placeGuideService,
      ids: [],
      filters: []
    },
  },
  serviceNames: function() {
    return Object.keys(this.__routes)
  },
  get: function(name) {
    const endpoint = this.__routes[name]
    if (!endpoint) {
      throw new Error(`Unknown ${name} - must be one of ${this.serviceNames().join(', ')}.`)
    }

    return endpoint
  },
  buildURL: function(baseURL, baseService, apiKey, endpoint, params) {
    const parts = [
      baseURL,
      baseService,
      this.buildPath(endpoint, params),
    ]

    return `${parts.join('/')}?apiKey=${apiKey}`
  },
  buildPath: function(endpoint, params) {
    const pathSuffix = endpoint.type === 'file' ? 'Data' : 'json'

    // Check for "index" route
    if (endpoint.index === true && params === undefined) {
      // No need to add the endpoint path here since it will be added in #buildServiceURL
      return pathSuffix
    }

    // Check for resource id(s)
    if (endpoint.ids.length !== 0) {
      if (isNumberOrString(params)) {
        return [endpoint.path, encodeURI(params), pathSuffix].join('/')
      }

      const id = endpoint.ids.find((id) => params[id] !== undefined)
      if (id !== undefined) {
        return [endpoint.path, encodeURI(params[id]), pathSuffix].join('/')
      }
    }

    // Check for relation filters
    const filter = endpoint.filters.find((filter) => params[filter] !== undefined)
    if (filter !== undefined) {
      return [filter, encodeURI(params[filter]), endpoint.path, pathSuffix].join('/')
    }

    // At this point we've determined that the request params are "impossible"
    throw new Error(`Argument error - either no argument or one of ${(endpoint.ids.concat(endpoint.filters)).join(', ')} must be present`)
  },
}

module.exports = Endpoints
