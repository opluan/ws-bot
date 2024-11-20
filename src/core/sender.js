const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const question = require('../../src/constants/question.js')
const answer = require('../../src/constants/answer.js')


const luzIA = {
    id: '5511972553036@c.us',
    name: 'LuzIA',
    number: '+55 (11) 97255-3036',
}

const blip = {
    id: '553172280540@c.us',
    name: 'Blip',
    number: '+55 (31) 7228-0540',
}

const botHeader = 'Transcrição do áudio de:'
const replyMsg = 'Pedindo pra IA transcrever seu audio, guenta ai...'

const getInstructions = (msgFrom) => {
    const msg = `${botHeader} ${msgFrom.split('@')[0].trim()}`

    return {
        instruction: `Realize a transcricao do Áudio para Texto, adicionando no inicio da msg de resposta: "${msg}"`,
        msg: msg
    }
}

const sendToBot = async (msg, bot, client) => {
    console.log('Chegou audio!');
    const instructions = getInstructions(msg.from);
    const media = await msg.downloadMedia();

    console.log('>>>> Aguardando 30s para pedir transcrição... <<<<');
    await new Promise(r => setTimeout(r, 30000));

    await msg.reply(replyMsg);

    console.log(`Enviando para ${bot.name} (${bot.number})`);
    await client.sendMessage(bot.id, media, { caption: instructions.instruction, sendAudioAsVoice: true });

    fs.writeFileSync('audioSender.json', JSON.stringify({ sendTo: msg.from }));
}

const transcriptFromBlip = async (msg, client) => {
    const fileContent = fs.readFileSync('audioSender.json', 'utf8');
    const audioSender = JSON.parse(fileContent);

    console.log(`Devolvendo msg para ${audioSender.sendTo}`)

    await client.sendMessage(audioSender.sendTo, msg.body);
}

const transcriptFromLuzIA = async (msg, client) => {
    let audioTranscript = msg.body.split(botHeader)[1]
    audioTranscript = audioTranscript.split('\n')
    audioTranscript = audioTranscript.filter(element => element.trim() !== '')

    const sendTo = audioTranscript[0].trim() + '@c.us'
    const sendMsg = '*Transcrição:* ' + audioTranscript[1].trim()

    console.log(`Devolvendo msg para ${sendTo}`)

    await client.sendMessage(sendTo, sendMsg);
}

module.exports = function sender(client) {
    client.on('message', async msg => {
        if (msg.from.includes('@c.us') && msg.hasMedia && (msg.type === 'audio' || msg.type === 'ptt') && msg.body === '') {
            sendToBot(msg, blip, client);
            // sendToBot(msg, luzIA, client);
        }

        if (msg.from === luzIA.id && msg.body.includes(botHeader)) {
            transcriptFromLuzIA(msg, client);
        }

        if (msg.from === blip.id && msg.body.includes('Transcrição:')) {
            transcriptFromBlip(msg, client);
        }
        
        if(msg.body === question.ping) {
            await client.sendMessage(msg.from, answer.pong);
        }
    });
}
