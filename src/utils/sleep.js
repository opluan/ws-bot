const logger = require('./logger.js')


const units = {
    ms: 1,
    s: 1000,
    min: 60 * 1000,
    h: 60 * 60 * 1000
}

module.exports = async (duration, unit = 's') => {
    logger.info(`Aguardando ${duration}${unit} para continuar...`)
    return new Promise(r => setTimeout(r, duration * units[unit]))
}