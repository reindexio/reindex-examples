var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('./RelaySchema.json');

module.exports = getBabelRelayPlugin(schema.data);
