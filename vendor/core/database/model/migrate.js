const User = require('./user')
const {
    helperAPI
} = require('../../../api')
const hash = helperAPI.encrypt('base64', 'thinh123123')
const user = User.build({
    username: 'deverpham',
    password: hash
})
user.save()
    .then(console.log)