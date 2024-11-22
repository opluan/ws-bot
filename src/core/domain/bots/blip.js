const fs = require('fs')
const { logger } = require('../../../utils')

const getTranscriptFromBlip = (msg) => {
    logger.info(`Blip: Lendo quem enviou o audio...`)
    let audioSender
    
    try {
        audioSender = JSON.parse(fs.readFileSync('audioSender.json', 'utf8'))
    } catch (err) {
        logger.error(`\n\n${err}\n\nNao consegui ler o audio...\n`)
        return null
    }

    logger.info(`Devolvendo msg para ${audioSender.sendTo}...`)
    return { sendTo: audioSender.sendTo, sendMsg: msg.body }
}

module.exports = {
    id: '553172280540@c.us',
    name: 'Blip',
    number: '+55 (31) 7228-0540',
    handle: (msg) => getTranscriptFromBlip(msg)
}
