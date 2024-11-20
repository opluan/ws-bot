const client = require('./src/services/client.js')
const sender = require('./src/core/sender.js')


client.initialize();
sender(client)
