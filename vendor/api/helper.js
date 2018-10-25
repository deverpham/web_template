const crypto = require('crypto');
const configAPI = require('./config')
class HelperAPI {
    /**
     * @param {string} encode - Encode type example: 'base64', 'hex'
     * @param {string} text - Text that need to be encrypted
     */
    encrypt(encode, text) {
        const salt = configAPI.database().secret_key
        return crypto.createHmac('sha256', salt)
            .update(text) // Update with content need to be hashed
            .digest(encode);
    }
}
module.exports = new HelperAPI()