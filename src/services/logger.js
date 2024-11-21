const getDate = () => new Date().toISOString().split('.')[0]
const blueCollor = '\x1b[34m'

module.exports = {
    info: (msg) => {
        console.info(`${blueCollor}[INFO] [${getDate()}] ${msg}`)
    },
    warn: (msg) => {
        console.warn(`[WARN] [${getDate()}] ${msg}`)
    },
    error: (msg) => {
        console.error(`[ERROR] [${getDate()}] ${msg}`)
    },
}
