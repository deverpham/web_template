
class Hook {
    constructor() {
        this.hooks = {}
    }
    do_action(hookName) {
        return new Promise(resolve => {

            if (hookName in this.hooks) {
                const list = Object.keys(this.hooks[hookName])
                Promise.all((list.map(action => {
                    return new Promise(resolve => {
                        console.log('new_line');
                        this.hooks[hookName][action].callback()
                        if (this.hooks[hookName][action].once) {
                            console.log('zo zo')
                            delete this.hooks[hookName][action]
                            resolve()
                        } else {
                            console.log('false', 'asdasd')
                            resolve()
                        }
                    })
                }))).then(resolve)
            } else {
                resolve()
            }
        })
    }
    add_action(hookName, action, once = false) {
        if (hookName in this.hooks) {
            Object.assign(this.hooks[hookName], {
                [action.id]: {
                    callback: action.callback,
                    once
                }
            });
        } else {
            this.hooks[hookName] = {};
            Object.assign(this.hooks[hookName], {
                [action.id]: {
                    callback: action.callback,
                    once
                }
            });
        }
    }
}
module.exports = Hook