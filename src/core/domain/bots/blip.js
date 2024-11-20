const fs = require('fs')


const getTranscriptFromBlip = (msg) => {
    const audioSender = JSON.parse(fs.readFileSync('audioSender.json', 'utf8'))

    console.log(`Devolvendo msg para ${audioSender.sendTo}...`)

    return { sendTo: audioSender.sendTo, sendMsg: msg.body }
}

module.exports = {
    id: '553172280540@c.us',
    name: 'Blip',
    number: '+55 (31) 7228-0540',
    handle: (msg) => getTranscriptFromBlip(msg)
}
