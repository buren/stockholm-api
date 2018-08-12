const defaults = {
  root: false,
  type: 'json',
  index: false,
  path: undefined,
  ids: [],
  search: [],
  filters: [],
}

const route = (data) => {
  if (!data.path) {
    throw new Error('path-key is required for route')
  }

  return { ...defaults, ...data }
}

const routes = {
  FileInfos: route({
    index: true,
    path: 'FileInfos',
    filters: ['ServiceUnits'],
  }),
  Files: route({
    index: true,
    path: 'Files',
    ids: ['id'],
    filters: ['ServiceUnits'],
  }),
  FilesData: route({
    type: 'file',
    path: 'Files',
    ids: ['id'],
  }),
  ImageFileInfos: route({
    index: true,
    path: 'ImageFileInfos',
    filters: ['ServiceUnits']
  }),
  ImageFiles: route({
    index: true,
    path: 'ImageFiles',
    ids: ['id'],
    filters: ['ServiceUnits']
  }),
  ImageFilesData: route({
    type: 'file',
    path: 'ImageFiles',
    ids: ['id'],
  }),
  GeographicalAreaInfos: route({
    index: true,
    path: 'GeographicalAreaInfos',
    filters: ['ServiceUnits'],
  }),
  GeographicalAreas: route({
    index: true,
    path: 'GeographicalAreas',
    ids: ['id', 'friendlyId', 'name'],
    filters: ['ServiceUnits'],
  }),
  ServiceUnitTypeGroupInfos: route({
    index: true,
    path: 'ServiceUnitTypeGroupInfos',
    ids: [],
    search: [],
    filters: ['ServiceUnits'],
  }),
  ServiceUnitTypeGroups: route({
    index: true,
    path: 'ServiceUnitTypeGroups',
    ids: ['id', 'name'],
    filters: ['ServiceUnits'],
  }),
  ServiceUnitTypeInfos: route({
    index: true,
    path: 'ServiceUnitTypeInfos',
    filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
  }),
  DetailedServiceUnits: route({
    index: true,
    path: 'DetailedServiceUnits',
    ids: ['id', 'name'],
    search: ['name'],
    filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes']
  }),
  ServiceUnitInfos: route({
    index: true,
    path: 'ServiceUnitInfos',
    search: ['name'],
    filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
  }),
  RelatedServiceUnitInfos: route({
    path: 'RelatedServiceUnitInfos',
    filters: ['ServiceUnits'],
  }),
  ServiceUnits: route({
    index: true,
    path: 'ServiceUnits',
    ids: ['id', 'name'],
    search: ['name'],
    filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
  }),
  ServiceUnitsCount: route({
    index: true,
    path: 'ServiceUnits/Count',
    filters: ['GeographicalAreas', 'ServiceUnitTypeGroups', 'ServiceUnitTypes'],
  }),
  RelatedServiceUnits: route({
    path: 'RelatedServiceUnits',
    ids: ['id', 'name'],
  }),
  ServiceUnitTypes: route({
    index: true,
    path: 'ServiceUnitTypes',
    ids: ['id'],
    filters: ['ServiceUnits', 'ServiceUnitTypeGroups'],
  }),
  Attributes: route({
    path: 'Attributes',
    filters: ['ServiceUnits']
  }),
  ServiceGuideService: route({
    root: true,
    index: true,
    path: 'ServiceGuideService',
  }),
  PlaceService: route({
    root: true,
    index: true,
    path: 'PlaceService',
  }),
}

module.exports = routes
