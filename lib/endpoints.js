const Parsers = require('./endpoint-parsers')

const Endpoints = {
  FileInfos: {
    index: true,
    path: 'FileInfos',
    parser: Parsers.fileInfo,
    ids: [],
    filters: ['ServiceUnits'],
  },
  Files: {
    index: true,
    path: 'Files',
    parser: Parsers.file,
    ids: ['id'],
    filters: ['ServiceUnits'],
  },
  ImageFileInfos: {
    index: true,
    path: 'ImageFileInfos',
    parser: Parsers.imageFileInfo,
    ids: [],
    filters: ['ServiceUnits']
  },
  ImageFiles: {
    index: true,
    path: 'ImageFiles',
    parser: Parsers.imageFile,
    ids: ['id'],
    filters: ['ServiceUnits']
  },
  GeographicalAreaInfos: {
    index: true,
    path: 'GeographicalAreaInfos',
    parser: Parsers.geoAreaInfo,
    ids: [],
    filters: ['ServiceUnits'],
  },
  GeographicalAreas: {
    index: true,
    path: 'GeographicalAreas',
    parser: Parsers.geoArea,
    ids: ['id', 'friendlyId', 'name'],
    filters: ['ServiceUnits'],
  },
  ServiceUnitTypeGroupInfos: {
    index: true,
    path: 'ServiceUnitTypeGroupInfos',
    parser: Parsers.serviceUnitTypeGroup,
    ids: [],
    filters: ['ServiceUnits'],
  },
  ServiceUnitTypeGroups: {
    index: true,
    path: 'ServiceUnitTypeGroups',
    parser: Parsers.serviceTypeGroup,
    ids: ['id', 'name'],
    filters: ['ServiceUnits'],
  },
  ServiceUnitTypeInfos: {
    index: true,
    path: 'ServiceUnitTypeInfos',
    parser: Parsers.serviceUnitTypeInfo,
    ids: [],
    filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
  },
  DetailedServiceUnits: {
    index: true,
    path: 'DetailedServiceUnits',
    parser: Parsers.detailedServiceUnit,
    ids: ['id', 'name'],
    filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes']
  },
  ServiceUnitInfos: {
    index: true,
    path: 'ServiceUnitInfos',
    parser: Parsers.serviceUnitInfo,
    ids: [],
    filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
  },
  ServiceUnits: {
    index: true,
    path: 'ServiceUnits',
    parser: Parsers.serviceUnit,
    ids: ['id', 'name'],
    filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
  },
  ServiceUnitTypes: {
    index: true,
    path: 'ServiceUnitTypes',
    parser: Parsers.serviceUnitType,
    ids: ['id'],
    filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
  },
  Attributes: {
    index: false,
    path: 'Attributes',
    parser: Parsers.attributes,
    ids: [],
    filters: ['ServiceUnits']
  },
  ServiceGuideService: {
    index: true,
    path: '', // root path
    parser: Parsers.serviceGuideService,
    ids: [],
    filters: []
  },
}

module.exports = Endpoints
