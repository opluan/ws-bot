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

const bots = {
    luzIA: {
        id: '5511972553036@c.us',
        name: 'LuzIA',
        number: '+55 (11) 97255-3036',
        handle: (client, msg) => transcriptFromBlip(client, msg)
    },
    blip: {
        id: '553172280540@c.us',
        name: 'Blip',
        number: '+55 (31) 7228-0540',
        handle: (client, msg) => transcriptFromLuzIA(client, msg)
    }
}

module.exports = bots
