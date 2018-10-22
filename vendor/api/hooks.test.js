const HookFilter = require('./hooks');
const hook = new HookFilter();
hook.add_action('TEST', {
    callback: function () {
        console.log('gg')
    }
})
hook.do_action('TEST').then(result => {
    console.log('done')
})