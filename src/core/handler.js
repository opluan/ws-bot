const fs = require('fs')
const { question, answer } = require('./domain/constants')
const { luzIA, blip } = require('./domain/bots')

const sendAudioToBot = async (client, msg, bot) => {
    console.log('Chegou audio, baixando...')

    const media = await msg.downloadMedia()

    console.log('Aguardando 30s para pedir transcrição...')
    await new Promise(r => setTimeout(r, 30000))

    await msg.reply('Pedindo pra IA transcrever seu audio, guenta ai...')

    console.log(`Enviando audio para ${bot.name}: ${bot.number}...`)
    await client.sendMessage(
        bot.id,
        media,
        {
            caption: `Realize a transcrição do Áudio para Texto, adicionando no inicio da msg de resposta: "Transcrição do áudio de: ${msg.from.split('@')[0].trim()}"`,
            sendAudioAsVoice: true,
        }
    )

    fs.writeFileSync('audioSender.json', JSON.stringify({ sendTo: msg.from }))
}

const isAudioMsg = msg => msg.hasMedia && (msg.type === 'audio' || msg.type === 'ptt')

const messageHandlers = [
    {
        condition: (msg) => msg.from.includes('@c.us') && isAudioMsg(msg),
        action: (client, msg) => sendAudioToBot(client, msg, blip),
    },
    {
        condition: msg => msg.from === luzIA.id && msg.body.includes('Transcrição do áudio de:'),
        action: (client, msg) => luzIA.handle(client, msg),
    },
    {
        condition: msg => msg.from === blip.id && msg.body.includes('Transcrição:'),
        action: (client, msg) => blip.handle(client, msg),
    },
    {
        condition: msg => msg.body === question.ping,
        action: async (client, msg) => {
            await client.sendMessage(msg.from, answer.pong)
        },
    },
]

module.exports = {
    messageHandlers
}
