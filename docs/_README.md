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

You can get the parser for any endpoint, which can be handy if you've disabled automatic parsing, but would like to parse some responses

```javascript
api.parserFor('ServiceGuideService')
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
const id = '96a67da3-938b-487e-ac34-49b155cb277b'
api.getServiceUnits({ ServiceUnitTypes: id })
  .then((data) => {
    console.log('outside gyms', data)
  })
```

Fetch one `ServiceUnit`

```javascript
const id = '2eec914c-595d-4148-85cb-97b35c7694d2'
api.getServiceUnits({ ud: id })
  .then((data) => {
    console.log('Grimsta outside gym', data)
})
```

Search

```javascript
const name = 'stockholm'
api.getServiceUnits({ search: { name: name }})
  .then((data) => {
    console.log('stockholm search', data)
  })
  .catch((error) => { console.error(error) })
```

Parameters are automatically URI encoded

```javascript
const name = 'Familj och relation'
api.getServiceUnitTypeGroups({ name: name })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => { console.error(error) })
```

See other examples in [`kitchen-sink.js`](kitchen-sink.js).

## Method documentation

These are the methods available on `api` (all methods are available for both `ServiceGuideService` and `PlaceService`).

{{{api_method_doc}}}
