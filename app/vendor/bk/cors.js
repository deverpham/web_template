const cors = require('cors');
module.exports = (function() {
    return {
        init: () => {
            console.log('init on module cors')
            APP.use(cors({
                origin: '*'
            }))
        }
    }
}())