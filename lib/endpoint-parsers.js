const toFirstCharLowercase = (string) => {
  return string[0].toLowerCase() + string.substr(1, string.length)
}

const extractAndCamelizeData = (data, fieldNames) => {
  const result = {}
  fieldNames.forEach((name) => {
    if (data[name] !== undefined) {
      result[toFirstCharLowercase(name)] = data[name]
    }
  })

  return result
}

const parseIdAndNames = (data) => {
  return extractAndCamelizeData(
    data,
    ['Id', 'Name', 'SingularName', 'PluralName', 'DefinitiveName', 'FriendlyId']
  )
}

const parseRecordTimestamps = (data) => {
  // TODO: Parse dates
  //       Their formatted like this: /Date(1495521575400+0200)/
  return {
    createdAt: data['TimeCreated'], // wierd date
    updatedAt: data['TimeUpdated'], // wierd date
  }
}

const parseGeoPosition = (data) => extractAndCamelizeData(data, ['X', 'Y'])

// FileInfos(array)
//   Id (uuid)
//   Name (String)
const parseFileInfo = (data) => extractAndCamelizeData(data, ['Id', 'Name'])

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
const parseFile = (data) => {
  return {
    ...parseIdAndNames(data),
    ...parseRecordTimestamps(data),
    ...extractAndCamelizeData(
      data,
      ['ContentType', 'Description', 'FriendlyName', 'ImageAspectRatio', 'Length']
    ),
    imageSize: extractAndCamelizeData(data['ImageSize'] || {}, ['Height', 'Width']),
  }
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
const parseGeoAreaInfo = (data) => extractAndCamelizeData(data, ['FriendlyId', 'Id', 'Name'])

// GeographicalAreas(array)
//   FriendlyId(string)
//   Id(integer)
//   IsCityArea(boolean)
//   Name(string)
const parseGeoArea = (data) => {
  const fieldNames = ['FriendlyId', 'Id', 'Name', 'IsCityArea']
  return extractAndCamelizeData(data, fieldNames)
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
const parseDetailedServiceUnit = (data) => {
  // Fields with nested data
  const attributes = data['Attributes']
  const geographicalAreas = data['GeographicalAreas']
  const geographicalPosition = data['GeographicalPosition']
  const serviceUnitTypes = data['ServiceUnitTypes']
  const serviceUnitTypeGroupInfo = serviceUnitTypes['ServiceUnitTypeGroupInfo']

  // Fields
  const attributeFields = ['Id', 'Name', 'Description', 'Group', 'GroupDescription', 'Value']
  const geoFields = ['FriendlyId', 'Id', 'Name', 'IsCityArea']
  const serviceUnitTypeFields = ['DefinitiveName', 'Id', 'SingularName', 'PluralName']

  let groupInfo;
  return {
    geographicalAreas: data['GeographicalAreas'],
    ...parseIdAndNames(data),
    ...parseRecordTimestamps(data),
    attributes: attributes.map((attribute) => {
      return extractAndCamelizeData(attribute, attributeFields)
    }),
    geographicalAreas: geographicalAreas.map((geographicalArea) => {
      return extractAndCamelizeData(geographicalArea, geoFields)
    }),
    geographicalPosition: parseGeoPosition(geographicalPosition),
    relatedServiceUnits: [
      // no such thing in the current data set, not sure what attributes are present
    ],
    serviceUnitTypes: serviceUnitTypes.map((serviceUnitType) => {
      groupInfo = serviceUnitType['ServiceUnitTypeGroupInfo']

      return {
        ...extractAndCamelizeData(serviceUnitTypeFields, serviceUnitTypeFields),
        serviceUnitTypeGroupInfo: {
          ...parseIdAndNames(groupInfo),
          ...parseRecordTimestamps(groupInfo),
        },
      }
    })
  }
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
const parseServiceUnit = (data) => {
  const geoPos = data['GeographicalPosition'] || {}
  return {
    ...parseIdAndNames(groupInfo),
    ...parseRecordTimestamps(data),
    ...parseGeoPosition(geoPos),
  }
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
const parseServiceUnitType = (data) => {
  const groupInfo = data['ServiceUnitTypeGroupInfo']
  return {
    ...parseIdAndNames(data),
    ...parseRecordTimestamps(data),
    serviceUnitTypeGroupInfo: {
      ...parseIdAndNames(groupInfo),
    },
  }
}

// ServiceGuideService(array)
//   Name(string)
//   Uri(string)
const parseServiceGuideService = (data) => extractAndCamelizeData(data, ['Name', 'Uri'])

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
  serviceUnitType: parseServiceUnitType,
  serviceGuideService: parseServiceGuideService,
}
