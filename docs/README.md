# StockholmAPI - Documentation

- [Usage](#usage)
- [Examples](#examples)
- [Method documentation](#method-documentation)

:information_source: There is a lot of non-obvious names in the API.. documentation is available at http://api.stockholm.se/dokumentation, however its not "readable" by any metric. There is also [dataportalen.stockholm.se/dataportalen](http://dataportalen.stockholm.se/dataportalen/).


## Usage

:warning: You must have an API key to make any request. [Request one at api.stockholm.se](http://api.stockholm.se/).

Stockholm API keys are split in two `ServiceGuideService` ("Enhetsdatabasen"/Entity database) and `PlaceService` ("Platsdatabasen"/Place database) and you request the API keys separately.

Initialize

```javascript
const StockholmAPI = require('stockholm-api')

const serviceGuideServiceAPIKey = 'your_api_key' // required
const serviceAPI = new StockholmAPI({ ServiceGuideServiceAPIKey: serviceGuideServiceAPIKey })

// or to initialize a PlaceService client
const placeServiceAPIKey = 'your_api_key' // required
const placeAPI = new StockholmAPI({ PlaceServiceAPIKey: placeServiceAPIKey })
```

Please note that currently there is no way to call both `ServiceGuideService` and `PlaceService` using one instance of the client - you have to create two if you need to talk to both.

__Response parsing__

By default responses are parsed and some values are coerced (such as dates), you can disable the parsing by passing `parse: false` when initializing the API client
```javascript
const api = new StockholmAPI({
  parse: false,
  ServiceGuideServiceAPIKey: apiKey
})
```

## Examples

See other examples in [`kitchen-sink.js`](kitchen-sink.js).

Initialize
```javascript
const serviceGuideServiceAPIKey = 'your_api_key' // required
const api = new StockholmAPI({ ServiceGuideServiceAPIKey: apiKey })
```

Fetch all `ServiceUnits` of type "Utegym"/Outside gym
```javascript
const gymServiceUnitId = '96a67da3-938b-487e-ac34-49b155cb277b'
api.getServiceUnits({ ServiceUnitTypes: gymServiceUnitId })
  .then((data) => {
    console.log('outside gyms', data)
  })
```

Fetch one `ServiceUnit`
```javascript

const grimstaGymServiceUnitId = '2eec914c-595d-4148-85cb-97b35c7694d2'
api.getServiceUnits({ name: grimstaGymServiceUnitId })
  .then((data) => {
    console.log('Grimsta outside gym', data)
})
```

See other examples in [`kitchen-sink.js`](kitchen-sink.js).

## Method documentation

These are the methods available on `api` (all methods are available for both `ServiceGuideService` and `PlaceService`).

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

## `getFilesData(params)`
`params` must be one of

  - `"value"` - resource `id`
  - `{ id: "value" }`

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

## `getImageFilesData(params)`
`params` must be one of

  - `"value"` - resource `id`
  - `{ id: "value" }`

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
