// Parse API date string to millis since Unix Epoch
// Example:
//  const dateString = '/Date(1330524285303+0100)/'
//  console.log(getDateMillis(dateString))
const getDateMillis = (dateString) => {
  // Determine what direction the time zone offset is and at what index it's at
  let sign = '+'
  let timeZoneIndex = dateString.indexOf('+')

  if (timeZoneIndex === -1) {
    sign = '-'
    timeZoneIndex = dateString.indexOf('-')
  }

  // Extract the time zone offset (get 0100 from /Date(1330524285303+0100)/)
  const utcHourOffsetString = dateString.substring(timeZoneIndex + 1, timeZoneIndex + 3)
  // Convert hour offset to millis
  const utcHourOffsetMillis = parseInt(utcHourOffsetString) * 60 * 60 * 1000

  // Extract the milliseconds (get 1330524285303 from /Date(1330524285303+0100)/)
  let millis = parseInt(dateString.substring(6, timeZoneIndex))

  // Add the time zone offset to millis
  if (sign === '+') {
    millis -= utcHourOffsetMillis
  } else {
    millis += utcHourOffsetMillis
  }

  return millis
}

// Converts an API date string to an UTC date object
// Example:
//  const dateString = '/Date(1330524285303+0100)/'
//  console.log(convertAPIDate(dateString))
const convertAPIDate = (dateString) => {
  const date = new Date(0) // Set the date to UNIX epoch
  date.setUTCMilliseconds(getDateMillis(dateString))

  return date
}

module.exports = convertAPIDate
