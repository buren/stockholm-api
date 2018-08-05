const fs = require('fs')
const Endpoints = require('./lib/endpoints')

const paramsArgValueDoc = (v) => `\n  - \`${v}\``
const paramsArgValueTypeDoc = (value, type) => `\n  - \`"value"\` - resource \`${value}\``
const paramsArgValueTypeObjectDoc = (value, type) => `\n  - \`{ ${value}: "value" }\``

const generateDocs = () => {
  return Object.keys(Endpoints).map((name) => {
    const service = Endpoints[name]
    let paramParts = []

    if (service.index === true) {
      paramParts.push([paramsArgValueDoc('undefined')])
    }
    paramParts.push(service.ids.map((id) => paramsArgValueTypeDoc(id)))
    paramParts.push(service.ids.map((id) => paramsArgValueTypeObjectDoc(id)))
    paramParts.push(service.filters.map((f) => paramsArgValueTypeObjectDoc(f)))

    paramParts = paramParts.filter((e) => e.length !== 0)

    const doc = `## \`get${name}(params)\`
\`params\` must be one of
${paramParts.join('')}`
    return doc
  })
}

const compile = (templatePath, targetPath, compiler) => {
  fs.readFile(templatePath, 'utf8', (err, template) => {
    const compiled = compiler(template)

    fs.writeFile(targetPath, compiled, () => {
      console.log(`${targetPath} compiled!`)
    })
  })
}

// Main
const methodDocs = generateDocs()
compile(
  'docs/_README.md',
  'docs/README.md',
  (template) => {
    return template.replace('{{{api_method_doc}}}', methodDocs.join("\n\n"))
  }
)
