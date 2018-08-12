# Endpoint Schema

## FileInfo
```
Id (uuid)
Name (String)
```

## File
```
ContentType(string) - image/jpeg
Description(string)
FriendlyName(string)
Id(uuid)
ImageAspectRatio(decimal) - key optional
ImageSize(json) - key option
  Height(integer)
  Width(integer)
Length(integer)
Name(string)
TimeCreated(weird date) - /Date(1514534566347+0100)/
TimeUpdated(weird date) - /Date(1514534566347+0100)/
```

## ImageFileInfo
```
Id (uuid)
Name (String)
```

## ImageFile
```
ContentType(string) - image/jpeg
Description(string)
FriendlyName(string)
Id(uuid)
ImageAspectRatio(decimal)
ImageSize(json)
  Height(integer)
  Width(integer)
Length(integer)
Name(string)
TimeCreated(weird date) - /Date(1514534566347+0100)/
TimeUpdated(weird date) - /Date(1514534566347+0100)/
```

## GeographicalAreaInfo
```
FriendlyId(string)
Id(integer)
Name(string)
```

## GeographicalArea
```
FriendlyId(string)
Id(integer)
IsCityArea(boolean)
Name(string)
```


## ServiceUnitTypeGroupInfo
```
Id(integer)
Name(string)
```

## ServiceUnitTypeGroup
```
Id(integer)
Name(string)
```

## ServiceUnitTypeInfo
```
Id(integer)
SingularName(string)

Attributes(json)
  Id(string)
  Name
  Description
  Group
  GroupDescription
  Value
```

## DetailedServiceUnit
```
Id(string)
Name
TimeCreated(weird date) - /Date(1514534566347+0100)/
TimeUpdated(weird date) - /Date(1514534566347+0100)/
Attributes(json)
  Id(string)
  Name
  Description
  Group
  GroupDescription
  Value
GeographicalAreas(json)
  Id(integer)
  Name(string)
  IsCityArea(boolean)
GeographicalPosition(json)
  X(integer)
  Y(integer)
RelatedServiceUnits(json) - No data for this found...
ServiceUnitTypes(json)
  DefinitiveName
  Id(string)
  SingularName
  PluralName
  ServiceUnitTypeGroupInfo(json)
    Id(integer)
    Name
    TimeCreated(weird date) - /Date(1514534566347+0100)/
    TimeUpdated(weird date) - /Date(1514534566347+0100)/
```

## ServiceUnitInfo
```
Id(uuid)
Name(string)
```

```
## ServiceUnits
Id(uuid)
Name(string)
TimeCreated(weird date) - /Date(1514534566347+0100)/
TimeUpdated(weird date) - /Date(1514534566347+0100)/
GeographicalPosition(json)
  X(integer)
  Y(integer)
```

## ServiceUnitType
```
DefinitiveName(string)
Id(uuid)
SingularName(string)
PluralName(string)
ServiceUnitTypeGroupInfo(json)
  Id(integer)
  Name(string)
TimeCreated(weird data) - /Date(1514534566347+0100)/
TimeUpdated(weird data) - /Date(1514534566347+0100)/
```

## ServiceGuideService
```
Name(string)
Uri(string)
```  

## PlaceService
```
Name(string)
Uri(string)
```
