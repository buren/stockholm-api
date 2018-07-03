// console.log(process.argv[2])

const StockholmAPI = require('./lib/stockholm-api');

const apiKey = ''
const api = new StockholmAPI({ apiKey: apiKey })

const services = [
  // 'FileInfos',
  // 'Files',  // Is ~7Mb to download...
  // 'ImageFileInfos',
  // 'ImageFiles',
  // 'GeoAreaInfos',
  // 'GeoAreas',
  // 'ServiceUnitTypeGroupInfos',
  // 'ServiceUnitTypeGroups',
  // 'ServiceUnitTypeInfos',
  // 'DetailedServiceUnits', // Is ~70Mb to download...
  // 'ServiceUnitInfos',
  // 'ServiceUnits',
  // 'ServiceUnitTypes',
  'ServiceGuideService'
]

services.forEach((serviceName) => {
  api.fetch(serviceName).then((data) => {
    console.log('======')
    console.log(serviceName, data)
    console.log('======')
  })
})
