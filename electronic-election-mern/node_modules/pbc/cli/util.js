const path = require('path')
const fs = require('fs')
const homedir = require('os').homedir()
const gitUrlParse = require("git-url-parse")

const protobufDir = path.join(homedir, '.protobuf-repo')
exports.protobufDir = protobufDir

exports.readConfig = function readConfig() {
  const url = fs.readFileSync('./.protobuf', {encoding: 'utf8'}).trim()
  const {resource, owner, name} = gitUrlParse(url)
  return {
    url,
    schemaDir: path.join(protobufDir, resource, owner, name),
  }
}