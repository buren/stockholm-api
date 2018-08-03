# StockholmAPI

Simple JavaScript API client for [Stockholm API](http://api.stockholm.se/dokumentation).

## Getting started

```
npm install --save stockholm-api
```

# Usage

Request an API key at [api.stockholm.se](http://api.stockholm.se/).

Simple example
```javascript
const api = new StockholmAPI({ apiKey: 'your-secret-key' })
api.fetch('GeographicalAreas').then((res) => console.log(res.json))
```
