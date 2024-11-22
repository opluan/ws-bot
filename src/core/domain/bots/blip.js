const { logger, audioSenderStorage } = require('../../../utils')

const getTranscriptFromBlip = (msg) => {
    logger.info(`Blip: Lendo quem enviou o audio...`)
    const audioSender = audioSenderStorage.get()
    
    logger.info(`Devolvendo msg para ${audioSender.sendTo}...`)
    return { sendTo: audioSender.sendTo, sendMsg: msg.body }
}

module.exports = {
    id: '553172280540@c.us',
    name: 'Blip',
    number: '+55 (31) 7228-0540',
    handle: (msg) => getTranscriptFromBlip(msg)
}
