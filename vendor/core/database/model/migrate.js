const User = require('./user')
const {
    configAPI
} = require('../../../api')
const hash = configAPI.getCrypto()
    .update('thinh123123') // Update with content need to be hashed
    .digest('base64');

const user = User.build({
    username: 'deverpham',
    password: hash
})
user.save()
    .then(console.log)