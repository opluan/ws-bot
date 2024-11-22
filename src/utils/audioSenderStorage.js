const fs = require('fs')
const logger = require('./logger.js')


const queue = []


module.exports = {
    add: (item) => {
        queue.push(item)
    },
    get: () => {
        if (queue.length === 0) {
            logger.error('Fila de audio está vazia...')
            return
        }

        return queue.shift()
    }
}