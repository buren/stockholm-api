const basePath = 'ServiceGuideService'
const url = `${basePath}/ServiceGuideService/`


// GET /json
api.getServiceGuideService()

// GET DetailedServiceUnits/json
// GET DetailedServiceUnits/{idOrName}/json
// GET GeographicalAreas/{idOrFriendlyIdOrName}/DetailedServiceUnits/json
// GET ServiceUnitTypeGroups/{idOrName}/DetailedServiceUnits/json
// GET ServiceUnitTypes/{id}/DetailedServiceUnits/json
api.getDetailedServiceUnits({ idOrName: 1, GeographicalAreasByIdOrFriendlyIdOrName: 1, ServiceUnitTypeGroupsByIdOrName: 1, ServiceUnitTypesById: 1 })

// GET FileInfos/json
// GET ServiceUnits/{idOrName}/FileInfos/json
api.getFileInfos({ ServiceUnitsByIdOrName: 1})

// GET Files/json
// GET Files/{id}/json
// GET ServiceUnits/{idOrName}/Files/json
api.getFiles({ id: 1, ServiceUnitsByIdOrName: 1 })

// GET GeographicalAreaInfos/json
// GET ServiceUnits/{idOrName}/GeographicalAreaInfos/json
api.getGeographicalAreaInfos({ ServiceUnitsByIdOrName: 1 })


// GET GeographicalAreas/json
// GET GeographicalAreas/{idOrFriendlyIdOrName}/json
// GET ServiceUnits/{idOrName}/GeographicalAreas/json
api.getGeographicalAreas({ idOrFriendlyIdOrName: 1, ServiceUnitsByIdOrName: 1 })

// GET ServiceUnitInfos/json
// GET GeographicalAreas/{idOrFriendlyIdOrName}/ServiceUnitInfos/json
// GET ServiceUnitTypeGroups/{idOrName}/ServiceUnitInfos/json
// GET ServiceUnitTypes/{id}/ServiceUnitInfos/json
api.getServiceUnitInfos({ ServiceUnitTypeGroupsByIdOrName: 1, ServiceUnitTypesById: 1 })


// GET ServiceUnits/json
// GET ServiceUnits/{idOrName}/json
// GET GeographicalAreas/{idOrFriendlyIdOrName}/ServiceUnits/json
// GET ServiceUnitTypeGroups/{idOrName}/ServiceUnits/json
// GET ServiceUnitTypes/{id}/ServiceUnits/json
api.getServiceUnits({ GeographicalAreasByIdOrFriendlyIdOrName: 1, ServiceUnitsByIdOrName: 1, ServiceUnitTypeGroupsByIdOrName: 1, ServiceUnitTypesById: 1 })

// GET ImageFileInfos/json
// GET ServiceUnits/{idOrName}/ImageFileInfos/json
api.getImageFileInfos({ ServiceUnitsByIdOrName: 1 })

// GET ImageFiles/json
// GET ImageFiles/{id}/json
// GET ServiceUnits/{idOrName}/ImageFiles/json
api.getImageFiles({ id: 1, ServiceUnitsByIdOrName: 1 })

// GET ServiceUnits/{idOrName}/Attributes/json
api.getAttributes({ ServiceUnitsByIdOrName: 1 })

// GET ServiceUnitTypeGroupInfos/json
// GET ServiceUnits/{idOrName}/ServiceUnitTypeGroupInfos/json
api.getServiceUnitTypeGroupInfos({ ServiceUnitsByIdOrName: 1 })

// GET ServiceUnitTypeGroups/json
// GET ServiceUnitTypeGroups/{idOrName}/json
// GET ServiceUnits/{idOrName}/ServiceUnitTypeGroups/json
api.getServiceUnitTypeGroups({ id: 1, ServiceUnitsByIdOrName: 1 })

// GET ServiceUnitTypeInfos/json
// GET ServiceUnitTypeGroups/{idOrName}/ServiceUnitTypeInfos/json
// GET ServiceUnits/{idOrName}/ServiceUnitTypeInfos/json
api.getServiceUnitTypeInfos({ ServiceUnitsByIdOrName: 1, ServiceUnitTypeGroupsByIdOrName: 1 })

// GET ServiceUnitTypes/json
// GET ServiceUnitTypes/{id}/json
// GET ServiceUnits/{idOrName}/ServiceUnitTypes/json
// GET ServiceUnitTypeGroups/{idOrName}/ServiceUnitTypes/json
api.getServiceUnitTypes({ id: 1, ServiceUnitsByIdOrName: 1, ServiceUnitTypeGroupsByIdOrName: 1 })            

// ===============
//      TODO
// ===============

// TODO: We need to add this to "Endpoints" and add a endpoint-parser
// GET ServiceUnits/Count/json
// GET ServiceUnitTypeGroups/{idOrName}/ServiceUnits/Count/json
// GET ServiceUnitTypes/{id}/ServiceUnits/Count/json
// GET GeographicalAreas/{idOrFriendlyIdOrName}/ServiceUnits/Count/json
api.getServiceUnitsCount({ ServiceUnitTypeGroupsByIdOrName: 1, ServiceUnitTypesById: 1, GeographicalAreasByIdOrFriendlyIdOrName: 1 })

// TODO: We have to have special handling for this since this will return the raw file data
// GET Files/{id}/Data
api.getFilesData({ id: 1 })

// TODO: We have to have special handling for this since this will return the raw file data
// GET ImageFiles/{id}/Data
api.getImageFilesData(id)

// TODO: Figure out how we best handle this "related" case
// GET ServiceUnits/{idOrName}/RelatedServiceUnitInfos/json
api.getRelatedServiceUnitInfos({ ServiceUnitsByIdOrName: 1 })

// TODO: Figure out how we best handle this "related" case
// GET ServiceUnits/{idOrName}/RelatedServiceUnits/json
api.getRelatedServiceUnits({ ServiceUnitsByIdOrName: 1 })
