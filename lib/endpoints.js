const Routes = require('./routes')

const isNumberOrString = (object) => {
  return typeof object === "number" || typeof object === "string"
}

// https://stackoverflow.com/a/32108184/955366
const isEmptyObject = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object
}

const Endpoints = {
  serviceNames: () => Object.keys(Routes),
  get: function(name) {
    const endpoint = Routes[name]
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
