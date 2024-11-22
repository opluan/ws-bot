const fs = require('fs')
const { logger } = require('../utils')
const { question, answer } = require('./domain/constants')
const { luzIA, blip } = require('./domain/bots')


const sendAudioToBot = async (msg, bot) => {
    logger.info(`Chegou audio de ${msg.from}, baixando...`)
    let media
    
    try {
        media = await msg.downloadMedia()
    } catch (err) {
        logger.error(`\n\n${err}\n\nNao consegui baixar o audio...\n`)
        return
    }

    logger.info('Informando a quem mandou audio que vai pedir transcrição...')
    
    try {
        await msg.reply(answer.audioReply)
    } catch (err) {
        logger.error(`\n\n${err}\n\nNao consegui enviar mensagem de resposta...\n`)
        return
    }

    const options = {
        caption: answer.askTranscription(msg.from.split('@')[0].trim()),
        sendAudioAsVoice: true,
    }

    logger.info('Salvando quem vai enviou o audio...')
    
    try {
        fs.writeFileSync('audioSender.json', JSON.stringify({ sendTo: msg.from }))
    } catch (err) {
        logger.error(`\n\n${err}\n\nNao consegui salvar quem enviou o audio...\n`)
        return
    }

    return { sendTo: bot.id, sendMsg: media, options }
}

const isAudioMsg = msg => msg.hasMedia && (msg.type === 'audio' || msg.type === 'ptt')
const isGroupMsg = msg => msg.from.includes('@g.us')

const messageHandlers = [
    {
        condition: (msg) => !isGroupMsg(msg) && isAudioMsg(msg),
        action: async (msg) => sendAudioToBot(msg, blip),
    },
    {
        condition: (msg) => msg.from === luzIA.id && msg.body.includes('Transcrição do áudio de:'),
        action: (msg) => luzIA.handle(msg),
    },
    {
        condition: (msg) => msg.from === blip.id && msg.body.includes('Transcrição:'),
        action: (msg) => blip.handle(msg),
    },
    {
        condition: (msg) => msg.body === question.ping,
        action: (msg) => answer.pong,
    },
]

module.exports = {
    messageHandlers
}
