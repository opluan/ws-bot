const question = require('../../src/constants/question.js')
const answer = require('../../src/constants/answer.js')

module.exports = function sender(client) {
    client.on('message', async msg => {
        const chat = await msg.getChat();
    
        if(msg.body === question.ping) {
            await client.sendMessage(msg.from, answer.pong);
        }
    });
}
