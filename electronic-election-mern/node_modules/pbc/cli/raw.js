const path = require('path')
const fs = require('fs')
const {readConfig} = require('./util')

exports.main = function main(args) {
  if (args.length < 1) {
    throw new Error('Missing an argument')
  }

  const schemaDir = path.join(readConfig().schemaDir, 'schema')
  const schemas = fs.readdirSync(schemaDir)
    .filter(s => path.extname(s) === '.proto')
    .map(s => path.basename(s, '.proto'))

  for (const schema of schemas) {
    const SOURCE = path.join(schemaDir, `${schema}.proto`)
    const OUT = path.join(args[0], `${schema}.proto`)

    console.log(OUT)
    fs.copyFileSync(SOURCE, OUT)
  }
  return 0
}

