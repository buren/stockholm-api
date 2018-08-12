# StockholmAPI - API Client method Documentation

Initialize `ServiceGuideService` API
```javascript
const StockholmAPI = require('stockholm-api')

const apiKey = 'your_api_key' // required
const api = new StockholmAPI({ ServiceGuideServiceAPIKey: apiKey })
```

Initialize `PlaceService` API

```javascript
const apiKey = 'your_api_key' // required
const api = new StockholmAPI({ PlaceServiceAPIKey: apiKey })
```

## Method documentation

These are the methods available on `api` (all methods are available for both `ServiceGuideService` and `PlaceService`).

{{{api_method_doc}}}
