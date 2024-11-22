const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { logger } = require('../utils');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: '.auth'
    }),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('qr', qr => {
    logger.info('Whatsapp não conectado, gerando QR Code...');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    logger.info('Whatsapp conectado com sucesso!!!\n');
});

module.exports = client
