#!/usr/bin/env node

const path = require('path')
const pkg = require('../package.json')
const update = require(path.join(__dirname, '..', 'cli', 'update'))
const raw = require(path.join(__dirname, '..', 'cli', 'raw'))
const desc = require(path.join(__dirname, '..', 'cli', 'desc'))
const json = require(path.join(__dirname, '..', 'cli', 'json'))

const args = process.argv
let ret

switch (args[2]) {
  case 'update':
    ret = update.main(args.slice(3))
    break
  case 'raw':
    ret = raw.main(args.slice(3))
    break
  case 'desc':
    ret = desc.main(args.slice(3))
    break
  case 'json':
    ret = json.main(args.slice(3))
    break
  case 'version':
    console.log(pkg.version)
    break
  default:
    process.stderr.write([
      'Usage: pbc update [branch name]',
      '       pbc raw <dest>',
      '       pbc desc <dest>',
      '       pbc json <dest>',
      '',
    ].join('\n'))
}

if (typeof ret === 'number') {
  process.exit(ret)
}