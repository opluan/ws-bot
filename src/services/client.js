const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: '.auth'
    }),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('qr', qr => {
    console.log('Whatsapp não conectado, gerando QR Code...');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Whatsapp conectado com sucesso!!!\n');
});

module.exports = client
