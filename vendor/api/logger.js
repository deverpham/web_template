const chalk = require('chalk');
class Logger {
    debug(...message) {
        console.log(chalk.blue(...message))
    }
    error(...message) {
        console.log(chalk.red(...message))
    }

    warn(...message) {
        console.log(chalk.yellow(...message))
    }

}
module.exports = new Logger();