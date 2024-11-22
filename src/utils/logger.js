const Stopwatch = require('./stopwatch.js')

const getDate = () => new Date().toISOString().split('.')[0].replace('T', ' ')
const blueCollor = '\x1b[34m'
const resetCollor = '\x1b[0m'

module.exports = {
    info: (msg) => {
        console.info(blueCollor + `[INFO] [${getDate()}] ${msg}` + resetCollor)
    },
    warn: (msg) => {
        console.warn(`[WARN] [${getDate()}] ${msg}`)
    },
    error: (msg, err) => {
        const error = err && err.message ? err.message.replace('Error:', '').replace('\n', '').trim() : err
        console.error(`[ERROR] [${getDate()}] ${JSON.stringify({msg, error})}`)
    },
    Stopwatch: () => new Stopwatch()
}
