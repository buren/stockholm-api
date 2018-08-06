# StockholmAPI

Simple JavaScript API client for [Stockholm API](http://api.stockholm.se/dokumentation).

- [Getting started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)

## Getting started

Requires `node` >= 8.9.0

```
npm install --save stockholm-api
```

:information_source: There is a lot of non-obvious names in the API.. documentation is available at http://api.stockholm.se/dokumentation, however its not "readable" by any metric. There is also [dataportalen.stockholm.se/dataportalen](http://dataportalen.stockholm.se/dataportalen/).

# Usage

:warning: You must have an API key to make any request. [Request one at api.stockholm.se](http://api.stockholm.se/).

Initialize

```javascript
const StockholmAPI = require('stockholm-api')

const apiKey = 'your_api_key'
const api = new StockholmAPI({ ServiceGuideServiceAPIKey: apiKey })
```

Fetch all `ServiceUnits` of type "Utegym"/Outside gym
```javascript
const gymServiceUnitId = '96a67da3-938b-487e-ac34-49b155cb277b'
api.getServiceUnits({ ServiceUnitTypes: gymServiceUnitId }).then((data) => {
  console.log('outside gyms', data)
})
```

Fetch one `ServiceUnit`
```javascript

const grimstaGymServiceUnitId = '2eec914c-595d-4148-85cb-97b35c7694d2'
api.getServiceUnits({ name: grimstaGymServiceUnitId }).then((data) => {
  console.log('Grimsta outside gym', data)
})
```

By default responses are parsed and some values are coerced (such as dates), you can disable the parsing
```javascript
const api = new StockholmAPI({
  parse: false,
  ServiceGuideServiceAPIKey: apiKey
})
```


[__Full API client documentation__](docs/README.md).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/buren/stockholm-api.

## Wish list

- Test suite!
- Better documentation for public methods in `client.js`
- Describe each endpoint type - for example `ServiceUnitTypeGroupInfos` etc.

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
$ node kitchen-sink.js # should print a lot of JSON
```

[See the current API client documentation](docs/README.md).

## License

The gem is available as open source under the terms of the [MIT License](LICENSE).
