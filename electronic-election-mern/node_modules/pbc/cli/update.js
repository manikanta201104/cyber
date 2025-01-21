const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')
const tar = require('tar')
const {protobufDir, readConfig} = require('./util')

exports.main = function main(args) {
  if (!fs.existsSync(protobufDir)) {
    fs.mkdirSync(protobufDir)
  }

  const {url, schemaDir} = readConfig()

  const tempFile = path.join(protobufDir, `.temp.tar.gz`)
  const branch = args[0] || 'master'
  console.log('...Downloading schema from:', url, branch)
  execSync(`git archive --remote=${url} --output=${tempFile} ${branch} schema`)

  fs.rmdirSync(schemaDir, {force: true, recursive: true})
  fs.mkdirSync(schemaDir, {recursive: true})
  tar.x({
    file: tempFile,
    cwd: schemaDir,
    sync: true,
  })

  fs.unlinkSync(tempFile)
  console.log('Finished')
  return 0
}