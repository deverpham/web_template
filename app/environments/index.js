module.exports = (function () {
    switch (process.env.NODE_ENV) {
        default: {
            return require('./dev.env')
        }
        case 'prod': {
            return require('./prod.env')
        }
    }
}())