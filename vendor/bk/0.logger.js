const chalk = require('chalk');
module.exports = (function() {
    return {
        init: () => {
            console.log('initting')
            global.logger = (function() {
                return {
                    chalk: chalk,
                    error: (...messages) => {
                        console.log(chalk.red(...messages))
                    },
                    log: (...messages) => {
                        console.log(...messages)
                    },
                    success: (...message) => {
                        console.log(chalk.green(...message))
                    },
                    worker: (...message) => {
                        if(message) {
                        console.log(chalk.bgMagentaBright('WORKER LOG'), chalk.magenta(...message))
                        }
                        return {
                            warn: (...message) => {
                                console.log(chalk.bgMagentaBright('WORKER LOG: ERROR'), chalk.yellow(...message))
                            }
                        }
                    },
                    runner: (...message) => {
                        return {
                            warn: (...message) => {
                                console.log(chalk.bgCyanBright('WORKER PAGE: ERROR'), chalk.yellow(...message))
                            },
                            log: (...message) => {
                                console.log(chalk.bgCyan(...message))
                            }
                        }
                    }
                }
            }())
        }
    }
}())