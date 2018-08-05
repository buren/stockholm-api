const recurseDatum = require('./recurse-datum')

const toFirstCharLowercase = (string) => {
  return string[0].toLowerCase() + string.substr(1, string.length)
}

const camelizeObjectKeys = (object, fieldNames) => {
  const result = {}
  fieldNames.forEach((name) => {
    if (object[name] !== undefined) {
      result[toFirstCharLowercase(name)] = object[name]
    }
  })
  return result
}

const camelize = (datum, fieldNames) => {
  return recurseDatum(datum, (data) => {
    return camelizeObjectKeys(data, fieldNames)
  })
}

module.exports = camelize
