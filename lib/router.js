const basePath = 'ServiceGuideService'
const url = `${basePath}/ServiceGuideService/`

api.getDetailedServiceUnits({
  GeographicalAreaByIdOrFriendlyName: 1
  ServiceUnitTypeGroupsByIdOrName: 1,
  ServiceUnitTypes: 1
})

// Routes
api.getServiceGuideService()         // /json
api.getDetailedServiceUnits()        // DetailedServiceUnits/{idOrName}/json
api.getDetailedServiceUnits(id)      // DetailedServiceUnits/json
api.getFilesInfos()                  // FileInfos/json
api.getFiles()                       // Files/json
api.getFilesData(id)                 // Files/{id}/Data
api.getFiles(id)                     // Files/{id}/json
api.getGeographicalAreaInfos()       // GeographicalAreaInfos/json
// GeographicalAreas/{idOrFriendlyIdOrName}/DetailedServiceUnits/json
api.getGeographicalAreaInfos(id)     // GeographicalAreas/{idOrFriendlyIdOrName}/json
// GeographicalAreas/{idOrFriendlyIdOrName}/ServiceUnitInfos/json
// GeographicalAreas/{idOrFriendlyIdOrName}/ServiceUnits/Count/json
// GeographicalAreas/{idOrFriendlyIdOrName}/ServiceUnits/json
api.getGeographicalAreas()           // GeographicalAreas/json
api.getImageFileInfos()              // ImageFileInfos/json
api.getImageFiles()                  // ImageFiles/json
api.getImageFileData(id)             // ImageFiles/{id}/Data
api.getImageFile(id)                 // ImageFiles/{id}/json
api.getServiceUnitInfos()            // ServiceUnitInfos/json
// ServiceUnits/{idOrName}/Attributes/json
// ServiceUnits/{idOrName}/FileInfos/json
// ServiceUnits/{idOrName}/Files/json
// ServiceUnits/{idOrName}/GeographicalAreaInfos/json
// ServiceUnits/{idOrName}/GeographicalAreas/json
// ServiceUnits/{idOrName}/ImageFileInfos/json
// ServiceUnits/{idOrName}/ImageFiles/json
// ServiceUnits/{idOrName}/json
// ServiceUnits/{idOrName}/RelatedServiceUnitInfos/json
// ServiceUnits/{idOrName}/RelatedServiceUnits/json
// ServiceUnits/{idOrName}/ServiceUnitTypeGroupInfos/json
// ServiceUnits/{idOrName}/ServiceUnitTypeGroups/json
// ServiceUnits/{idOrName}/ServiceUnitTypeInfos/json
// ServiceUnits/{idOrName}/ServiceUnitTypes/json
api.getServiceUnitsCount()           // ServiceUnits/Count/json
api.getServiceUnits()                // ServiceUnits/json
api.ServiceUnitTypeGroupInfos()      // ServiceUnitTypeGroupInfos/json
// ServiceUnitTypeGroups/{idOrName}/DetailedServiceUnits/json
// ServiceUnitTypeGroups/{idOrName}/json
// ServiceUnitTypeGroups/{idOrName}/ServiceUnitInfos/json
// ServiceUnitTypeGroups/{idOrName}/ServiceUnits/Count/json
// ServiceUnitTypeGroups/{idOrName}/ServiceUnits/json
// ServiceUnitTypeGroups/{idOrName}/ServiceUnitTypeInfos/json
// ServiceUnitTypeGroups/{idOrName}/ServiceUnitTypes/json
api.getDetailedServiceUnits()        // ServiceUnitTypeGroups/json
api.getServiceUnitTypeInfos()        // ServiceUnitTypeInfos/json
// ServiceUnitTypes/{id}/DetailedServiceUnits/json
// ServiceUnitTypes/{id}/json
// ServiceUnitTypes/{id}/ServiceUnitInfos/json
// ServiceUnitTypes/{id}/ServiceUnits/Count/json
// ServiceUnitTypes/{id}/ServiceUnits/json
api.getServiceUnitTypes()            // ServiceUnitTypes/json
