const client = require('./src/client/client.js')
const sender = require('./src/core/sender.js')


client.initialize();
sender(client)
