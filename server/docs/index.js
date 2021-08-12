const merge = require('deepmerge')
const fs = require('fs')
const path = require('path')
const YAML = require('yamljs')

const objs = []
fs.readdirSync(__dirname).forEach(file => {
    if(file.endsWith('.yaml')) {
        objs.push(YAML.load(path.join(__dirname, file)))
    }
})

const swaggerDoc = merge.all(objs)
module.exports = swaggerDoc
