
const { filterBags } = require('./helpers/asynchook')
const filterModule = require('loopback-filters')
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

class HookFilter extends Hook {
    constructor() {
        super();
        this.filter_hooks = []
    }

    do_filter(hookName, defualt = {}) {
        return new Promise(resolve => {
            if (hookName in this.filter_hooks) {
                const list = Object.keys(this.filter_hooks[hookName]).map(hook => {
                    return this.filter_hooks[hookName][hook]
                })
                const orderedHooks = filterModule(list, {
                    order: 'order DESC'
                }).map(hook => hook.callback)
                console.log(orderedHooks)
                filterBags(defualt, ...orderedHooks).then(result => {
                    resolve(result)
                })
            } else {
                resolve()
            }
        })
    }
    add_filter(hookName, action) {
        if (hookName in this.filter_hooks) {
            Object.assign(this.filter_hooks[hookName], {
                [action.id]: {
                    callback: action.callback,
                    order: action.order
                }
            });
        } else {
            this.filter_hooks[hookName] = {};
            Object.assign(this.filter_hooks[hookName], {
                [action.id]: {
                    callback: action.callback,
                    order: action.order
                }
            });
        }
    }
}
module.exports = { HookFilter }