const camelize = require('./utils/camelize')
const recurseDatum = require('./utils/recurse-datum')
const convertAPIDate = require('./utils/convert-api-date')


const parseCount = (datum) => {
  return camelize[datum, 'Value']
}

const parseIdAndNames = (datum) => {
  return camelize(
    datum,
    ['Id', 'Name', 'SingularName', 'PluralName', 'DefinitiveName', 'FriendlyId']
  )
}

const parseRecordTimestamps = (datum) => {
  return recurseDatum(datum, (data) => {
    return {
      timeCreated: convertAPIDate(data['TimeCreated']),
      timeUpdated: convertAPIDate(data['TimeUpdated']),
    }
  })
}

const parseGeoPosition = (datum) => camelize(datum, ['X', 'Y'])

// FileInfos(array)
//   Id (uuid)
//   Name (String)
const parseFileInfo = (datum) => camelize(datum, ['Id', 'Name'])

// Files(array)
//   ContentType(string) - image/jpeg
//   Description(string)
//   FriendlyName(string)
//   Id(uuid)
//   ImageAspectRatio(decimal) - key optional
//   ImageSize(json) - key option
//     Height(integer)
//     Width(integer)
//   Length(integer)
//   Name(string)
//   TimeCreated(wierd date) - /Date(1514534566347+0100)/
//   TimeUpdated(wierd date) - /Date(1514534566347+0100)/
const parseFile = (datum) => {
  return recurseDatum(datum, (data) => {
    return {
      ...parseIdAndNames(data),
      ...parseRecordTimestamps(data),
      ...camelize(
        data,
        ['ContentType', 'Description', 'FriendlyName', 'ImageAspectRatio', 'Length']
      ),
      imageSize: camelize(data['ImageSize'] || {}, ['Height', 'Width']),
    }
  })
}

// ImageFileInfos(array)
//   Id (uuid)
//   Name (String)
const parseImageFileInfo = parseFileInfo

// ImageFiles(array)
//   ContentType(string) - image/jpeg
//   Description(string)
//   FriendlyName(string)
//   Id(uuid)
//   ImageAspectRatio(decimal)
//   ImageSize(json)
//     Height(integer)
//     Width(integer)
//   Length(integer)
//   Name(string)
//   TimeCreated(wierd date) - /Date(1514534566347+0100)/
//   TimeUpdated(wierd date) - /Date(1514534566347+0100)/
const parseImageFile = parseFile

// GeographicalAreaInfos(array)
//   FriendlyId(string)
//   Id(integer)
//   Name(string)
const parseGeoAreaInfo = (datum) => camelize(datum, ['FriendlyId', 'Id', 'Name'])

// GeographicalAreas(array)
//   FriendlyId(string)
//   Id(integer)
//   IsCityArea(boolean)
//   Name(string)
const parseGeoArea = (datum) => {
  return recurseDatum(datum, (data) => {
    const fieldNames = ['FriendlyId', 'Id', 'Name', 'IsCityArea']
    return camelize(data, fieldNames)
  })
}

// ServiceUnitTypeGroupInfos(array)
//   Id(integer)
//   Name(string)
const parseServiceUnitTypeGroup = parseIdAndNames

// ServiceUnitTypeGroups(array)
//   Id(integer)
//   Name(string)
const parseServiceTypeGroup = parseIdAndNames

// ServiceUnitTypeInfos(array)
//   Id(integer)
//   SingularName(string)
const parseServiceUnitTypeInfo = parseIdAndNames

//   Attributes(json)
//     Id(string)
//     Name
//     Description
//     Group
//     GroupDescription
//     Value
const parseAttributes = (datum) => {
  return recurseDatum(datum, (data) => {
    const attributeFields = ['Id', 'Name', 'Description', 'Group', 'GroupDescription', 'Value']
    return camelize(data, attributeFields)
  })
}

// DetailedServiceUnits(array)
//   Id(string)
//   Name
//   TimeCreated(wierd date)
//   TimeUpdated(wierd date)
//   Attributes(json)
//     Id(string)
//     Name
//     Description
//     Group
//     GroupDescription
//     Value
//   GeographicalAreas(json)
//     Id(integer)
//     Name(string)
//     IsCityArea(boolean)
//   GeographicalPosition(json)
//     X(integer)
//     Y(integer)
//   RelatedServiceUnits(json) - No data for this found...
//   ServiceUnitTypes(json)
//     DefinitiveName
//     Id(string)
//     SingularName
//     PluralName
//     ServiceUnitTypeGroupInfo(json)
//       Id(integer)
//       Name
//       TimeCreated(wierd date)
//       TimeUpdated(wierd date)
const parseDetailedServiceUnitData = (data) => {
  // Fields with nested data
  const attributes = data['Attributes']
  const geographicalAreas = data['GeographicalAreas']
  const geographicalPosition = data['GeographicalPosition']
  const serviceUnitTypes = data['ServiceUnitTypes']
  const serviceUnitTypeGroupInfo = serviceUnitTypes['ServiceUnitTypeGroupInfo']

  // Fields
  const geoFields = ['FriendlyId', 'Id', 'Name', 'IsCityArea']
  const serviceUnitTypeFields = ['DefinitiveName', 'Id', 'SingularName', 'PluralName']

  let groupInfo;
  return {
    geographicalAreas: data['GeographicalAreas'],
    ...parseIdAndNames(data),
    ...parseRecordTimestamps(data),
    attributes: parseAttributes(attributes),
    geographicalAreas: geographicalAreas.map((geographicalArea) => {
      return camelize(geographicalArea, geoFields)
    }),
    geographicalPosition: parseGeoPosition(geographicalPosition),
    relatedServiceUnits: [
      // no such thing in the current data set, not sure what attributes are present
    ],
    serviceUnitTypes: serviceUnitTypes.map((serviceUnitType) => {
      groupInfo = serviceUnitType['ServiceUnitTypeGroupInfo']

      return {
        ...camelize(serviceUnitTypeFields, serviceUnitTypeFields),
        serviceUnitTypeGroupInfo: {
          ...parseIdAndNames(groupInfo),
          ...parseRecordTimestamps(groupInfo),
        },
      }
    })
  }
}
const parseDetailedServiceUnit = (datum) => {
  return recurseDatum(datum, parseDetailedServiceUnitData)
}

// ServiceUnitInfos(array)
//   Id(uuid)
//   Name(string)
const parseServiceUnitInfo = parseIdAndNames

// ServiceUnit(array)
//   Id(uuid)
//   Name(string)
//   TimeCreated(wierd date)
//   TimeUpdated(wierd date)
//   GeographicalPosition(json)
//     X(integer)
//     Y(integer)
const parseServiceUnit = (datum) => {
  return recurseDatum(datum, (data) => {
    const geoPos = data['GeographicalPosition'] || {}
    return {
      ...parseIdAndNames(data),
      ...parseRecordTimestamps(data),
      ...parseGeoPosition(geoPos),
    }
  })
}

// ServiceUnitTypes(array)
//   DefinitiveName(string)
//   Id(uuid)
//   SingularName(string)
//   PluralName(string)
//   ServiceUnitTypeGroupInfo(json)
//     Id(integer)
//     Name(string)
//   TimeCreated(wierd data)
//   TimeUpdated(wierd data)
const parseServiceUnitType = (datum) => {
  return recurseDatum(datum, (data) => {
    const groupInfo = data['ServiceUnitTypeGroupInfo']
    return {
      ...parseIdAndNames(data),
      ...parseRecordTimestamps(data),
      serviceUnitTypeGroupInfo: {
        ...parseIdAndNames(groupInfo),
      },
    }
  })
}

// ServiceGuideService(array)
//   Name(string)
//   Uri(string)
const parseServiceGuideService = (datum) => camelize(datum, ['Name', 'Uri'])

// PlaceService(array)
//   Name(string)
//   Uri(string)
const parsePlaceGuideService = parseServiceGuideService

const parseFileData = (fileURL) => {
  return { url: fileURL }
}

module.exports = {
  geoPosition: parseGeoPosition,
  fileInfo: parseFileInfo,
  file: parseFile,
  imageFileInfo: parseImageFileInfo,
  imageFile: parseImageFile,
  geoAreaInfo: parseGeoAreaInfo,
  geoArea: parseGeoArea,
  serviceUnitTypeGroup: parseServiceUnitTypeGroup,
  serviceTypeGroup: parseServiceTypeGroup,
  serviceUnitTypeInfo: parseServiceUnitTypeInfo,
  detailedServiceUnit: parseDetailedServiceUnit,
  serviceUnitInfo: parseServiceUnitInfo,
  serviceUnit: parseServiceUnit,
  serviceUnitCount: parseCount,
  serviceUnitType: parseServiceUnitType,
  attributes: parseAttributes,
  serviceGuideService: parseServiceGuideService,
  placeService: parsePlaceGuideService,
  fileData: parseFileData,
}
