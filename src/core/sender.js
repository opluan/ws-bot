const { messageHandlers } = require('./handler.js')
const { logger } = require('../utils')
const { sleep } = require('../utils')

const stopwatch = logger.Stopwatch()

module.exports = function sender(client) {
    client.on('message', async msg => {
        for (const handler of messageHandlers) {
            if (handler.condition(msg)) {
                const duration = stopwatch.getTime('s')

                if (duration < 30) await sleep(30 - duration)

                logger.info('Tratando mensagem...')
                const response = await handler.action(msg)

                if (!response) {
                    break
                }
                
                logger.info(`Enviando mensagem para ${response.sendTo}...`)
                
                try {                
                    await client.sendMessage(response.sendTo, response.sendMsg, response?.options)
                } catch (err) {
                    logger.error('Nao consegui enviar mensagem...', err)
                    break
                }
                
                logger.info('Mensagem enviada com sucesso!!!\n')
                stopwatch.clear()
                break
            }
        }
    })
}
