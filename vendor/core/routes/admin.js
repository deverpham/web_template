const { RouterAPI } = require('../../api')
const route = new RouterAPI('admin');
console.log(Object.keys(route))
route.get('/', (req, res) => {
    res.send('ok')
})