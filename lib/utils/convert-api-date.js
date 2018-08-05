function convertAPIDate(dateString) {
  const utcHourOffsetIndex = dateString.indexOf('+')
  // const utcHourOffset = dateString.substring(utcHourOffsetIndex + 1, utcHourOffsetIndex + 5)
  // TODO Use utcHourOffset to get the correct timezone-adjusted time

  // example dateString: '/Date(1330524285303+0100)/'
  const millis = parseInt(dateString.substring(6, dateString.length - 7))
  const date = new Date(0) // Set the date to UNIX epoch
  date.setUTCMilliseconds(millis)

  return date
}

// Example:
//   const dateString = '/Date(1330524285303+0100)/'
//   console.log(convertAPIDate(dateString))

module.exports = convertAPIDate
