const bodyParser = require('body-parser');
module.exports = (function() {
    return {
        init : () => {
            APP.use(bodyParser.json())
            APP.use(bodyParser.urlencoded({
                extended: false
            }))
        }
    }
}())