# StockholmAPI

Simple JavaScript API client for [Stockholm API](http://api.stockholm.se/dokumentation).

- [Getting started](#getting-started)
- [Usage](#usage)
- [API Client method documentation](docs/README.md)
- [Endpoint Schema](endpoint-schema.md)
- [Links](#links)
- [Contributing](#contributing)

## Getting started

Requires `node` >= 8.9.0

```
npm install --save stockholm-api
```

# Usage

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
api.getServiceUnits({ id: id })
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

:calendar: Dates returned from the API are in a weird format `/Date(1330524285303+0100)/`, you can require a helper function that converts it to a JavaScript date object (UTC)
```javascript
const convertAPIDate = require('./stockholm-api/convert-api-date')
const dateString = '/Date(1330524285303+0100)/'
console.log(convertAPIDate(dateString)) // 2012-02-29T13:04:45.303Z
```

See the [full API client documentation](docs/README.md) or the [Endpoint Schema](endpoint-schema.md).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/buren/stockholm-api.

## Wish list

- Test suite!
- Describe each endpoint type - for example `ServiceUnitTypeGroupInfos` etc.
- TypeScript definitions (move to TypeScript?)

## Development

Setup
```
$ git clone https://github.com/buren/stockholm-api
$ cd stockholm-api
$ npm install
```

then set your API key
```
export STOCKHOLM_API_SERVICE_GUIDE_SERVICE_API_KEY=your_api_key
```

then to call most services index endpoint, run

```
$ npm run kitchen-sink # should print a lot of JSON
```

[See the current API client documentation](docs/README.md).

## Links

- [Blogpost explaining the API](http://utveckling.stockholm.se/2011/06/03/how-to-use-the-city-of-stockholm-open-api/)
- [Stockholm API Documentation](http://api.stockholm.se/dokumentation)
- [Stockolm Dataportalen](http://dataportalen.stockholm.se/dataportalen/)

## License

The library is available as open source under the terms of the [MIT License](LICENSE).
