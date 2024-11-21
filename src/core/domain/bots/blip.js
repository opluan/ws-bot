const fs = require('fs')


const getTranscriptFromBlip = (msg) => {
    console.log(`Blip: Lendo quem enviou o audio...`)
    let audioSender
    
    try {
        audioSender = JSON.parse(fs.readFileSync('audioSender.json', 'utf8'))
    } catch (err) {
        console.error(`\n\n${err}\n\nNao consegui ler o audio...\n`)
        return null
    }

    console.log(`Devolvendo msg para ${audioSender.sendTo}...`)
    return { sendTo: audioSender.sendTo, sendMsg: msg.body }
}

module.exports = {
    id: '553172280540@c.us',
    name: 'Blip',
    number: '+55 (31) 7228-0540',
    handle: (msg) => getTranscriptFromBlip(msg)
}
