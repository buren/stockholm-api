const camelize = require('./utils/camelize')
const recurseDatum = require('./utils/recurse-datum')
const convertAPIDate = require('./utils/convert-api-date')


const parseCount = (datum) => {
  return camelize[datum, 'Value']
}

const parseIdNamesAndListsKey = (datum) => {
  return recurseDatum(datum, (data) => {
    return {
      ...camelize(
        data,
        ['Id', 'Name', 'SingularName', 'PluralName', 'DefinitiveName', 'FriendlyId']
      ),
      ...parseListsKey(data)
    }
  })
}

const parseRecordTimestamps = (datum) => {
  return recurseDatum(datum, (data) => {
    return {
      timeCreated: convertAPIDate(data['TimeCreated']),
      timeUpdated: convertAPIDate(data['TimeUpdated']),
    }
  })
}

const parseListsKey = (datum) => {
  return recurseDatum(datum, (data) => {
    const lists = data['lists'] || data['Lists']
    if (lists !== undefined) {
      return {
        lists: lists.map((item) => camelize(item, ['Name', 'Uri']))
      }
    }

    return {}
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
      ...parseIdNamesAndListsKey(data),
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
const parseGeographicalAreaInfo = (datum) => {
  return recurseDatum(datum, (data) => {
    return {
      ...camelize(data, ['FriendlyId', 'Id', 'Name']),
      ...parseListsKey(data)
    }
  })
}

// GeographicalAreas(array)
//   FriendlyId(string)
//   Id(integer)
//   IsCityArea(boolean)
//   Name(string)
const parseGeographicalArea = (datum) => {
  return recurseDatum(datum, (data) => {
    const fieldNames = ['FriendlyId', 'Id', 'Name', 'IsCityArea']
    return camelize(data, fieldNames)
  })
}

// ServiceUnitTypeGroupInfos(array)
//   Id(integer)
//   Name(string)
const parseServiceUnitTypeGroup = parseIdNamesAndListsKey

// ServiceUnitTypeGroups(array)
//   Id(integer)
//   Name(string)
const parseServiceTypeGroup = parseIdNamesAndListsKey

// ServiceUnitTypeInfos(array)
//   Id(integer)
//   SingularName(string)
const parseServiceUnitTypeInfo = parseIdNamesAndListsKey

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
    ...parseIdNamesAndListsKey(data),
    ...parseRecordTimestamps(data),
    attributes: parseAttributes(attributes),
    geographicalAreas: parseGeographicalArea(data['GeographicalAreas']),
    geographicalPosition: parseGeoPosition(geographicalPosition),
    relatedServiceUnits: [
      // no such thing in the current data set, not sure what attributes are present
    ],
    serviceUnitTypes: serviceUnitTypes.map((serviceUnitType) => {
      groupInfo = serviceUnitType['ServiceUnitTypeGroupInfo']

      return {
        ...camelize(serviceUnitTypeFields, serviceUnitTypeFields),
        serviceUnitTypeGroupInfo: {
          ...parseIdNamesAndListsKey(groupInfo),
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
const parseServiceUnitInfo = parseIdNamesAndListsKey

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
      ...parseIdNamesAndListsKey(data),
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
      ...parseIdNamesAndListsKey(data),
      ...parseRecordTimestamps(data),
      serviceUnitTypeGroupInfo: {
        ...parseIdNamesAndListsKey(groupInfo),
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
  geoAreaInfo: parseGeographicalAreaInfo,
  geoArea: parseGeographicalArea,
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
