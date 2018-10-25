const crypto = require('crypto');
const configAPI = require('./config')
class HelperAPI {
    encrypt(encode, text) {
        const salt = configAPI.database().secret_key
        return crypto.createHmac('sha256', salt)
            .update(text) // Update with content need to be hashed
            .digest(encode);
    }
}
module.exports = new HelperAPI()