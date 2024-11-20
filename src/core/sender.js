const { messageHandlers } = require('./handler.js')


module.exports = function sender(client) {
    client.on('message', async msg => {
        for (const handler of messageHandlers) {
            if (handler.condition(msg)) {
                // TODO: Add Tratamento de erros
                // TODO: Isolamento da lógica de arquivos para facilitar o tratamento de erros
                console.log('Tratando mensagem...')
                const response = await handler.action(msg)
                
                console.log(`Enviando mensagem para ${response.sendTo}...`)
                await client.sendMessage(response.sendTo, response.sendMsg, response?.options)
                
                console.log('Mensagem enviada com sucesso!!!\n')

                break
            }
        }
    })
}
