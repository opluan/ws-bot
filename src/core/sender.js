const { messageHandlers } = require('./handler.js')


module.exports = function sender(client) {
    client.on('message', async msg => {
        for (const handler of messageHandlers) {
            if (handler.condition(msg)) {
                console.log('Tratando mensagem...')
                const response = await handler.action(msg)

                if (!response) {
                    break
                }
                
                console.log(`Enviando mensagem para ${response.sendTo}...`)
                
                try {                
                    await client.sendMessage(response.sendTo, response.sendMsg, response?.options)
                } catch (err) {
                    console.error(`\n\n${err}\n\nNao consegui enviar mensagem...\n`)
                    break
                }
                
                console.log('Mensagem enviada com sucesso!!!\n')

                break
            }
        }
    })
}
