# StockholmAPI - Documentation

## Getting started

Initialize

```javascript
const StockholmAPI = require('stockholm-api')

const apiKey = 'your_api_key' // required
const api = new StockholmAPI({ ServiceGuideServiceAPIKey: apiKey })
```

## Method documentation

These are the methods available on `api`.

## `getFileInfos(params)`
`params` can be

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getFiles(params)`
`params` can be

  - `undefined`
  - `"value"` - resource `id`
  - `{ id: "value" }`
  - `{ ServiceUnits: "value" }`

## `getImageFileInfos(params)`
`params` can be

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getImageFiles(params)`
`params` can be

  - `undefined`
  - `"value"` - resource `id`
  - `{ id: "value" }`
  - `{ ServiceUnits: "value" }`

## `getGeographicalAreaInfos(params)`
`params` can be

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getGeographicalAreas(params)`
`params` can be

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `friendlyId`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ friendlyId: "value" }`,
  - `{ name: "value" }`
  - `{ ServiceUnits: "value" }`

## `getServiceUnitTypeGroupInfos(params)`
`params` can be

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getServiceUnitTypeGroups(params)`
`params` can be

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ name: "value" }`
  - `{ ServiceUnits: "value" }`

## `getServiceUnitTypeInfos(params)`
`params` can be

  - `undefined`
  - `{ ServiceUnits: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`

## `getDetailedServiceUnits(params)`
`params` can be

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ name: "value" }`
  - `{ GeographicalAreas: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`,
  - `{ ServiceUnitTypes: "value" }`

## `getServiceUnitInfos(params)`
`params` can be

  - `undefined`
  - `{ GeographicalAreas: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`,
  - `{ ServiceUnitTypes: "value" }`

## `getServiceUnits(params)`
`params` can be

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ name: "value" }`
  - `{ GeographicalAreas: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`,
  - `{ ServiceUnitTypes: "value" }`

## `getServiceUnitTypes(params)`
`params` can be

  - `undefined`
  - `"value"` - resource `id`
  - `{ id: "value" }`
  - `{ ServiceUnits: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`

## `getAttributes(params)`
`params` can be

  - `{ ServiceUnits: "value" }`

## `getServiceGuideService(params)`
`params` can be

  - `undefined`
