# StockholmAPI

Simple JavaScript API client for [Stockholm API](http://api.stockholm.se/dokumentation).

## Getting started

Requires `node` >= 8.9.0

```
npm install --save stockholm-api
```

:information_source: There is a lot of non-obvious names in the API.. documentation is available at http://api.stockholm.se/dokumentation, however its not "readable" by any metric.

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

## Development

Get setup

```
$ git clone https://github.com/buren/stockholm-api
$ cd stockholm-api
$ npm install
```

then run

```
$ node example.js
```


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/buren/stockholm-api.

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## License

The gem is available as open source under the terms of the [MIT License](LICENSE).
