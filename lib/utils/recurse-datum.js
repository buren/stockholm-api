const recurseDatum = (datum, recursor) => {
  if (Array.isArray(datum)) {
    return datum.map((e) => recursor(e))
  }

  return recursor(datum)
}

module.exports = recurseDatum
