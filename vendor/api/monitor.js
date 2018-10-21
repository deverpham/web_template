const now = require('performance-now');
const usage = require('usage');

/**
 * getHealthServer
 * @return {object}
 */
function getUsageNow() {
    const pid = process.pid
    return new Promise(resolve => {
        usage.lookup(pid, { keepHistory: true }, function (err, result) {
            if (err) throw err;
            var memory = Math.floor(result.memory / 1000000)
            var cpu = result.cpu;
            resolve({
                memory,
                cpu
            })
        });
    })
}
/**
 * A Module to check Performance
 */
class Monitor {
    constructor(healthCheck = false) {
        this.start = now();
        if (healthCheck) {
            (async () => {
                await this._listenHealth()
            })()
        }

    }
    async _listenHealth() {
        const info = await getUsageNow();
        this.previousHealth = info
    }
    /**
     * Report Performance
     * @return {object}
     */
    async analytic() {
        const totalTime = now() - this.start;
        const lastHealth = await getUsageNow();
        if (this.previousHealth) {
            return {
                totalTime,
                memory: lastHealth.memory - this.previousHealth.memory,
                cpu: lastHealth.cpu - this.previousHealth.cpu
            }
        }
        return {
            totalTime
        }

    }
}
module.exports = {
    Monitor
}