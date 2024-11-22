const { messageHandlers } = require('./handler.js')
const { logger } = require('../utils')
const { sleep } = require('../utils')

module.exports = function sender(client) {
    client.on('message', async msg => {
        for (const handler of messageHandlers) {
            if (handler.condition(msg)) {
                await sleep(30)

                logger.info('Tratando mensagem...')
                const response = await handler.action(msg)

                if (!response) {
                    break
                }
                
                logger.info(`Enviando mensagem para ${response.sendTo}...`)
                
                try {                
                    await client.sendMessage(response.sendTo, response.sendMsg, response?.options)
                } catch (err) {
                    logger.error(`\n\n${err}\n\nNao consegui enviar mensagem...\n`)
                    break
                }
                
                logger.info('Mensagem enviada com sucesso!!!\n')
                break
            }
        }
    })
}
