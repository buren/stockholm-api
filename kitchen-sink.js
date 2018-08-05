const StockholmAPI = require('./index')

const serviceGuideServiceAPIKey = process.env.STOCKHOLM_API_SERVICE_GUIDE_SERVICE_API_KEY
const placeServiceAPIKey = process.env.STOCKHOLM_API_PLACE_SERVICE_API_KEY

const api = new StockholmAPI({
  ServiceGuideServiceAPIKey: serviceGuideServiceAPIKey,
  PlaceServiceAPIKey: placeServiceAPIKey,
})

const services = [
  'FileInfos',
  // 'Files',  // ~7Mb to download...
  'ImageFileInfos',
  'ImageFiles',
  'GeographicalAreas',
  'ServiceUnitTypeGroupInfos',
  'ServiceUnitTypeGroups',
  'ServiceUnitTypeInfos',
  // 'DetailedServiceUnits', // ~70Mb to download...
  'ServiceUnitInfos',
  'ServiceUnits',
  'ServiceUnitTypes',
  'ServiceGuideService'
]

services.forEach((serviceName) => {
  api.getService(serviceName).then((data) => {
    console.log(`=== [START] service ${serviceName} ===`)
    console.log(serviceName, data);
    console.log(`=== [END] service ${serviceName} ===`)
  })
})

console.log('=== [START] Fetch outside gyms ===')
const gymServiceUnitId = '96a67da3-938b-487e-ac34-49b155cb277b'
api.getServiceUnits({ ServiceUnitTypes: gymServiceUnitId }).then((data) => {
  console.log('gyms', data.map((d) => d.name))
})
console.log('=== [END] Fetch outside gyms ===')
