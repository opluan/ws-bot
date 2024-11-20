const { messageHandlers } = require('./handler.js')


module.exports = function sender(client) {
    client.on('message', async msg => {
        for (const handler of messageHandlers) {
            if (handler.condition(msg)) {
                await handler.action(client, msg)
                console.log('Mensagem enviada com sucesso!!!\n')

                break
            }
        }
    })
}
