const StockholmAPI = require('./index')
const serviceGuideServiceAPIKey = process.env.STOCKHOLM_API_SERVICE_GUIDE_SERVICE_API_KEY
const baseURL = process.argv[process.argv.length - 1]

const options = { ServiceGuideServiceAPIKey: serviceGuideServiceAPIKey }
if (baseURL.indexOf('http://') === 0) {
  options.baseURL = baseURL
}

if (!options.ServiceGuideServiceAPIKey) {
  throw new Error('Please set STOCKHOLM_API_SERVICE_GUIDE_SERVICE_API_KEY.')
}


const api = new StockholmAPI(options)

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
  api.getService(serviceName)
    .then((data) => {
      console.log(`=== [START] service ${serviceName} ===`)
      console.log(serviceName, data)
      console.log(`=== [END] service ${serviceName} ===`)
    }).catch((error) => { console.error(error) })
})

const fileID = '2a1ab309-7a8f-4024-ac17-a3d74d4b60f9'
api.getFilesData(fileID)
  .then((data) => {
    console.log('=== [START] PDF ===')
    console.log(data)
    console.log('=== [END] PDF ===')
  })
  .catch((error) => { console.error(error) })

const gymServiceUnitId = '96a67da3-938b-487e-ac34-49b155cb277b'
api.getServiceUnits({ ServiceUnitTypes: gymServiceUnitId })
  .then((data) => {
    console.log('=== [START] Outside gyms ===')
    console.log(data.map((d) => d.name))
    console.log('=== [END] Outside gyms ===')
  })
  .catch((error) => { console.error(error) })

// URL parameters are automatically encoded
const serviceUnitTypeGroupName = 'Familj och relation'
api.getServiceUnitTypeGroups({ name: serviceUnitTypeGroupName })
  .then((data) => {
    console.log('=== [START] Familj och relation ===')
    console.log(data)
    console.log('=== [END] Familj och relation ===')
  })
  .catch((error) => { console.error(error) })

// Search
const serviceUnitSearchName = 'stockholm'
api.getServiceUnits({ search: { name: serviceUnitSearchName }})
  .then((data) => {
    console.log('=== [START] Stockholm search ===')
    console.log(data)
    console.log('=== [END] Stockholm search ===')
  })
  .catch((error) => { console.error(error) })
