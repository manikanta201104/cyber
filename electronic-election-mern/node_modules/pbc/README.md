## pbc

[![Publish NPM](https://github.com/ltman/pbc/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/ltman/pbc/actions/workflows/npm-publish.yml)

A CLI tool for generating protobuf description from a schema repository.

**Supported output format**
- .desc
- .json (JSON descriptors of *[protobufjs](https://www.npmjs.com/package/protobufjs)*)

## Usage

### Create .protobuf file
.protobuf is a config file including a git URL of the schema repository for fetching schemas. 
Need to be created and stored in your project.

**Example**
```
my_project
├── src
├── package.json
└── .protobuf
```

.protobuf contains your git url
```
git@github.com:ltman/proto-repo.git
```

### Schema Repository Structure
All .proto files must be in the **"schema"** directory.
```
proto-repo
└── schema
    ├── schemaA.proto
    └── schemaB.proto
```

### CLI Command
- **update** - fetch all .proto schemas from a remote repository and store in local. 
Need to run every time the remote repository has been updated.
- **raw** - copy all .proto schemas
- **desc** - generate .desc output _(required Google *[protoc](https://developers.google.com/protocol-buffers/docs/downloads)*)_
- **json** - generate .json (JSON descriptors) output

```
npx pbc update // default master
npx pbc update <branch-name>

npx pbc raw <dest>
npx pbc desc <dest>
npx pbc json <dest>
```



    
