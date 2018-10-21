const { HookFilter } = require('./hooks');
const hook = new HookFilter();
hook.add_filter('TEST', {
    id: 'test',
    order: 3,
    callback: function (payload) {
        payload.name = 'ahihi'
        payload.number = 'gg'
        return payload;
    }
})
hook.add_filter('TEST', {
    id: 'test_2',
    order: 4,
    callback: function (payload) {
        payload.name = 'ahihis'
        payload.number = '10'
        return payload;
    }
})
hook.do_filter('TEST', {
    name: 'thinh'
}).then(result => {
    console.log(result)
})