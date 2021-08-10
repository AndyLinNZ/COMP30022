const path = require('path')
const YAML = require('yamljs')
const metadata = YAML.load(path.join(__dirname, 'metadata.yaml'))

module.exports = { ...metadata }
