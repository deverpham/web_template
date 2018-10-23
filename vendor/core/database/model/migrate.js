const User = require('./user')
const user = User.build({
    username: 'deverpham',
    password: 'thinh123123'
})
user.save()
    .then(console.log)