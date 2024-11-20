const getTranscriptFromLuzIA = async (client, msg) => {
    const audioTranscript = msg.body
        .split('Transcrição do áudio de:')[1]
        .split('\n')
        .filter(element => element.trim() !== '')
    
    const sendTo = audioTranscript[0].trim() + '@c.us'
    const sendMsg = '*Transcrição:* ' + audioTranscript[1].trim()

    console.log(`Devolvendo msg para ${sendTo}...`)

    await client.sendMessage(sendTo, sendMsg)
}

module.exports = {
    id: '5511972553036@c.us',
    name: 'LuzIA',
    number: '+55 (11) 97255-3036',
    handle: (client, msg) => getTranscriptFromLuzIA(client, msg)
}