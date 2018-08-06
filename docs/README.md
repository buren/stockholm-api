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
`params` must be one of

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getFiles(params)`
`params` must be one of

  - `undefined`
  - `"value"` - resource `id`
  - `{ id: "value" }`
  - `{ ServiceUnits: "value" }`

## `getImageFileInfos(params)`
`params` must be one of

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getImageFiles(params)`
`params` must be one of

  - `undefined`
  - `"value"` - resource `id`
  - `{ id: "value" }`
  - `{ ServiceUnits: "value" }`

## `getGeographicalAreaInfos(params)`
`params` must be one of

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getGeographicalAreas(params)`
`params` must be one of

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `friendlyId`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ friendlyId: "value" }`,
  - `{ name: "value" }`
  - `{ ServiceUnits: "value" }`

## `getServiceUnitTypeGroupInfos(params)`
`params` must be one of

  - `undefined`
  - `{ ServiceUnits: "value" }`

## `getServiceUnitTypeGroups(params)`
`params` must be one of

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ name: "value" }`
  - `{ ServiceUnits: "value" }`

## `getServiceUnitTypeInfos(params)`
`params` must be one of

  - `undefined`
  - `{ ServiceUnits: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`

## `getDetailedServiceUnits(params)`
`params` must be one of

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ name: "value" }`
  - `{ GeographicalAreas: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`,
  - `{ ServiceUnitTypes: "value" }`

## `getServiceUnitInfos(params)`
`params` must be one of

  - `undefined`
  - `{ GeographicalAreas: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`,
  - `{ ServiceUnitTypes: "value" }`

## `getRelatedServiceUnitInfos(params)`
`params` must be one of

  - `{ ServiceUnits: "value" }`

## `getServiceUnits(params)`
`params` must be one of

  - `undefined`
  - `"value"` - resource `id`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ name: "value" }`
  - `{ GeographicalAreas: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`,
  - `{ ServiceUnitTypes: "value" }`

## `getServiceUnitsCount(params)`
`params` must be one of

  - `undefined`
  - `{ GeographicalAreas: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`,
  - `{ ServiceUnitTypes: "value" }`

## `getRelatedServiceUnits(params)`
`params` must be one of

  - `"value"` - resource `id`,
  - `"value"` - resource `name`
  - `{ id: "value" }`,
  - `{ name: "value" }`

## `getServiceUnitTypes(params)`
`params` must be one of

  - `undefined`
  - `"value"` - resource `id`
  - `{ id: "value" }`
  - `{ ServiceUnits: "value" }`,
  - `{ ServiceUnitTypeGroups: "value" }`

## `getAttributes(params)`
`params` must be one of

  - `{ ServiceUnits: "value" }`

## `getServiceGuideService(params)`
`params` must be one of

  - `undefined`

## `getPlaceService(params)`
`params` must be one of

  - `undefined`
