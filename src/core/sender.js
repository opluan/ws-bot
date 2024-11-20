const fs = require('fs')
const question = require('../../src/constants/question.js')
const answer = require('../../src/constants/answer.js')
const { luzIA, blip } = require('../../src/constants/bots.js')

const sendToBot = async (client, msg, bot) => {
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

const transcriptFromBlip = async (client, msg) => {
    const audioSender = JSON.parse(fs.readFileSync('audioSender.json', 'utf8'))

    console.log(`Devolvendo msg para ${audioSender.sendTo}...`)

    await client.sendMessage(audioSender.sendTo, msg.body)
}

const transcriptFromLuzIA = async (client, msg) => {
    const audioTranscript = msg.body
        .split('Transcrição do áudio de:')[1]
        .split('\n')
        .filter(element => element.trim() !== '')
    
    const sendTo = audioTranscript[0].trim() + '@c.us'
    const sendMsg = '*Transcrição:* ' + audioTranscript[1].trim()

    console.log(`Devolvendo msg para ${sendTo}...`)

    await client.sendMessage(sendTo, sendMsg)
}

const isAudioMsg = msg => msg.hasMedia && (msg.type === 'audio' || msg.type === 'ptt')

const messageHandlers = [
    {
        condition: (msg) => msg.from.includes('@c.us') && isAudioMsg(msg),
        action: (client, msg) => sendToBot(client, msg, blip),
    },
    {
        condition: msg => msg.from === luzIA.id && msg.body.includes('Transcrição do áudio de:'),
        action: (client, msg) => transcriptFromLuzIA(client, msg),
    },
    {
        condition: msg => msg.from === blip.id && msg.body.includes('Transcrição:'),
        action: (client, msg) => transcriptFromBlip(client, msg),
    },
    {
        condition: msg => msg.body === question.ping,
        action: async (client, msg) => {
            await client.sendMessage(msg.from, answer.pong)
        },
    },
]

module.exports = function sender(client) {
    client.on('message', async msg => {
        for (const handler of messageHandlers) {
            if (handler.condition(msg)) {
                await handler.action(client, msg)
                console.log('Mensagem enviada com sucesso!!!\n')

                break
            }
        }
    })
}
