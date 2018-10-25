const crypto = require('crypto');
const configAPI = require('./config')
class HelperAPI {
    getCrypto() {
        const salt = configAPI.database().secret_key
        return crypto.createHmac('sha256', salt)
    }
}
module.exports = new HelperAPI()