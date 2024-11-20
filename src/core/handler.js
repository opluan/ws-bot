const fs = require('fs')
const { question, answer } = require('./domain/constants')
const { luzIA, blip } = require('./domain/bots')


const sendAudioToBot = async (msg, bot) => {
    console.log(`Chegou audio de ${msg.from}, baixando...`)
    const media = await msg.downloadMedia()

    console.log('Aguardando 30s para pedir transcrição...')
    await new Promise(r => setTimeout(r, 30000))

    console.log('Informando a quem mandou audio que vai pedir transcrição...')
    await msg.reply('Pedindo pra IA transcrever seu audio, guenta ai...')

    const options = {
        caption: `Realize a transcrição do Áudio para Texto, adicionando no inicio da msg de resposta: "Transcrição do áudio de: ${msg.from.split('@')[0].trim()}"`,
        sendAudioAsVoice: true,
    }

    console.log('Salvando quem vai enviou o audio...')
    fs.writeFileSync('audioSender.json', JSON.stringify({ sendTo: msg.from }))

    return { sendTo: bot.id, sendMsg: media, options }
}

const isAudioMsg = msg => msg.hasMedia && (msg.type === 'audio' || msg.type === 'ptt')

const messageHandlers = [
    {
        condition: (msg) => msg.from.includes('@c.us') && isAudioMsg(msg),
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
