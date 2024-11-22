const { privateDecrypt } = require('crypto');
const { performance } = require('perf_hooks')

const units = {
    ms: 1,
    s: 1000,
    min: 60 * 1000,
    h: 60 * 60 * 1000
}

module.exports = class Stopwatch {
    constructor() {
        this.startTime = performance.now();
    }

    getTime(unit = 's') {
        return (Math.round(performance.now() - this.startTime)) / units[unit]
    }
    
    getTimeString(unit = 's') {
        return `${this.getTime(unit)}${unit}`
    }

    clear() {
        this.startTime = performance.now();
    }
}
