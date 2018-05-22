var usage = require('usage');

var pid = process.pid // you can use any valid PID instead
function getUsageNow() {
    return new Promise(resolve => {
        usage.lookup(pid, {keepHistory:true} ,function(err, result) {
            if(err) throw err;
            var memory = Math.floor(result.memory/1000000)
            var cpu = result.cpu;
            resolve({
                memory,
                cpu
            })
        });
    })
}
function clearHistory() {
    usage.clearHistory(pid);
}
module.exports = {getUsageNow, clearHistory};