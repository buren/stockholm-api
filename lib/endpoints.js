const Parsers = require('./endpoint-parsers')

const Endpoints = {
  FileInfos: {
    path: 'ServiceGuideService/FileInfos',
    parser: Parsers.parseFileInfo,
  },
  Files: {
    path: 'ServiceGuideService/Files',
    parser: Parsers.parseFile,
  },
  ImageFileInfos: {
    path: 'ServiceGuideService/ImageFileInfos',
    parser: Parsers.parseImageFileInfo,
  },
  ImageFiles: {
    path: 'ServiceGuideService/ImageFiles',
    parser: Parsers.parseImageFile,
  },
  GeographicalAreaInfos: {
    path: 'ServiceGuideService/GeographicalAreaInfos',
    parser: Parsers.parseGeoAreaInfo,
  },
  GeographicalAreas: {
    path: 'ServiceGuideService/GeographicalAreas',
    parser: Parsers.parseGeoArea,
  },
  ServiceUnitTypeGroupInfos: {
    path: 'ServiceGuideService/ServiceUnitTypeGroupInfos',
    parser: Parsers.parseServiceUnitTypeGroup,
  },
  ServiceUnitTypeGroups: {
    path: 'ServiceGuideService/ServiceUnitTypeGroups',
    parser: Parsers.parseServiceTypeGroup,
  },
  ServiceUnitTypeInfos: {
    path: 'ServiceGuideService/ServiceUnitTypeInfos',
    parser: Parsers.parseServiceUnitTypeInfo,
  },
  DetailedServiceUnits: {
    path: 'ServiceGuideService/DetailedServiceUnits',
    parser: Parsers.parseDetailedServiceUnit,
  },
  ServiceUnitInfos: {
    path: 'ServiceGuideService/ServiceUnitInfos',
    parser: Parsers.parseServiceUnitInfo,
  },
  ServiceUnits: {
    path: 'ServiceGuideService/ServiceUnits',
    parser: Parsers.parseServiceUnit,
  },
  ServiceUnitTypes: {
    path: 'ServiceGuideService/ServiceUnitTypes',
    parser: Parsers.parseServiceUnitType,
  },
  ServiceGuideService: {
    path: 'ServiceGuideService',
    parser: Parsers.parseServiceGuideService,
  },
}

module.exports = Endpoints
