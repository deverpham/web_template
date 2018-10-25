const chalk = require('chalk');
const prettyError = require('pretty-error');
const pe = new prettyError();
pe.filter(function (traceLine, lineNumber) {
    if (lineNumber == 1 && true)
        console.log(chalk.gray('log at:', traceLine.shortenedAddr))
})
class Logger {
    debug(...message) {

        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message === 'object') return console.log(this.color('yellow', 'debug: '), message[0])
        console.log('debug: ', chalk.blue(...message))
    }
    error(...message) {

        const mark = new Error();
        pe.render(mark)
        console.log(chalk.red(...message))
    }

    warn(...message) {

        const mark = new Error();
        pe.render(mark)
        console.log(chalk.yellow(...message))
    }
    color(colorHex, ...message) {
        //console.log(pe.render(mark))
        return chalk[colorHex](...message)
    }
}
module.exports = new Logger();