const isNumberOrString = (object) => {
  return typeof object === "number" || typeof object === "string"
}

// https://stackoverflow.com/a/32108184/955366
const isEmptyObject = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object
}

const endpointSkeleton = {
  root: false,
  type: 'json',
  index: false,
  path: undefined,
  ids: [],
  search: [],
  filters: [],
}

const buildEndpoint = (data) => {
  if (!data.path) {
    throw new Error('path-key is required for endpoint')
  }

  return { ...endpointSkeleton, ...data }
}

const Endpoints = {
  __endpoints: {
    FileInfos: buildEndpoint({
      index: true,
      path: 'FileInfos',
      filters: ['ServiceUnits'],
    }),
    Files: buildEndpoint({
      index: true,
      path: 'Files',
      ids: ['id'],
      filters: ['ServiceUnits'],
    }),
    FilesData: buildEndpoint({
      type: 'file',
      path: 'Files',
      ids: ['id'],
    }),
    ImageFileInfos: buildEndpoint({
      index: true,
      path: 'ImageFileInfos',
      filters: ['ServiceUnits']
    }),
    ImageFiles: buildEndpoint({
      index: true,
      path: 'ImageFiles',
      ids: ['id'],
      filters: ['ServiceUnits']
    }),
    ImageFilesData: buildEndpoint({
      type: 'file',
      path: 'ImageFiles',
      ids: ['id'],
    }),
    GeographicalAreaInfos: buildEndpoint({
      index: true,
      path: 'GeographicalAreaInfos',
      filters: ['ServiceUnits'],
    }),
    GeographicalAreas: buildEndpoint({
      index: true,
      path: 'GeographicalAreas',
      ids: ['id', 'friendlyId', 'name'],
      filters: ['ServiceUnits'],
    }),
    ServiceUnitTypeGroupInfos: buildEndpoint({
      index: true,
      path: 'ServiceUnitTypeGroupInfos',
      ids: [],
      search: [],
      filters: ['ServiceUnits'],
    }),
    ServiceUnitTypeGroups: buildEndpoint({
      index: true,
      path: 'ServiceUnitTypeGroups',
      ids: ['id', 'name'],
      filters: ['ServiceUnits'],
    }),
    ServiceUnitTypeInfos: buildEndpoint({
      index: true,
      path: 'ServiceUnitTypeInfos',
      filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
    }),
    DetailedServiceUnits: buildEndpoint({
      index: true,
      path: 'DetailedServiceUnits',
      ids: ['id', 'name'],
      search: ['name'],
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes']
    }),
    ServiceUnitInfos: buildEndpoint({
      index: true,
      path: 'ServiceUnitInfos',
      search: ['name'],
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
    }),
    RelatedServiceUnitInfos: buildEndpoint({
      path: 'RelatedServiceUnitInfos',
      filters: ['ServiceUnits'],
    }),
    ServiceUnits: buildEndpoint({
      index: true,
      path: 'ServiceUnits',
      ids: ['id', 'name'],
      search: ['name'],
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
    }),
    ServiceUnitsCount: buildEndpoint({
      index: true,
      path: 'ServiceUnits/Count',
      filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
    }),
    RelatedServiceUnits: buildEndpoint({
      path: 'RelatedServiceUnits',
      ids: ['id', 'name'],
    }),
    ServiceUnitTypes: buildEndpoint({
      index: true,
      path: 'ServiceUnitTypes',
      ids: ['id'],
      filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
    }),
    Attributes: buildEndpoint({
      path: 'Attributes',
      filters: ['ServiceUnits']
    }),
    ServiceGuideService: buildEndpoint({
      root: true,
      index: true,
      path: 'ServiceGuideService',
    }),
    PlaceService: buildEndpoint({
      root: true,
      index: true,
      path: 'PlaceService',
    }),
  },
  serviceNames: function() {
    return Object.keys(this.__endpoints)
  },
  get: function(name) {
    const endpoint = this.__endpoints[name]
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
    ].filter((o) => o)

    const queryParts = [
      this.buildQuery(endpoint, params),
      `apiKey=${apiKey}`,
    ].filter((o) => o)

    return `${parts.join('/')}?${queryParts.join('&')}`
  },
  buildPath: function(endpoint, params) {
    const pathSuffix = endpoint.type === 'file' ? 'Data' : 'json'

    // Check for "index" route
    if (endpoint.index === true && params === undefined) {
      // Avoid adding the root paths twice
      if (endpoint.root === true) return pathSuffix

      return [endpoint.path, pathSuffix].join('/')
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

    if (params.search && !isEmptyObject(params.search)) {
      return [endpoint.path, pathSuffix].join('/')
    }

    // At this point we've determined that the request params are "impossible"
    throw new Error(`Argument error - either no argument or one of ${(endpoint.ids.concat(endpoint.filters)).join(', ')} must be present`)
  },
  buildQuery: function(endpoint, params) {
    // Params can be a string or number when getting a single resource
    if (isNumberOrString(params)) return

    const paramsSearch = (params || {}).search || {}
    if (isEmptyObject(paramsSearch)) return

    if (endpoint.search.length === 0) {
      throw new Error(`Argument error - ${endpoint.path} endpoint does not support search`)
    }

    Object.keys(paramsSearch).forEach((param) => {
      if (!endpoint.search.includes(param)) {
        throw new Error(`Argument error - unknown search parameter '${param}' for ${endpoint.path}, must be one of ${endpoint.search}`)
      }
    })

    return endpoint.search
      .map((name) => {
        const value = paramsSearch[name]
        if (value) {
          return [name, encodeURI(value)].join('=')
        }

      })
      .filter((o) => o).join('&')
  },
}

module.exports = Endpoints
