const fs = require('fs')
const logger = require('./logger.js')


module.exports = {
    add: (item) => {
        try {
            fs.writeFileSync('audioSender.json', JSON.stringify(item))
        } catch (err) {
            logger.error(`\n\n${err}\n\nNao consegui salvar quem enviou o audio...\n`)
            return
        }
    },
    get: () => {
        try {
            return JSON.parse(fs.readFileSync('audioSender.json', 'utf8'))
        } catch (err) {
            logger.error(`\n\n${err}\n\nNao consegui ler o audio...\n`)
            return null
        }
    }
}