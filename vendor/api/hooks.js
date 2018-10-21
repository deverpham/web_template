
const { filterBags } = require('./helpers/asynchook')
const filterModule = require('loopback-filters')
const randomString = require('randomstring');
class Hook {
    constructor() {
        this.hooks = {}
    }
    /**
     * @todo Refactor
     * @todo remove default
     * @param {string} hookName 
     */
    do_action(hookName) {
        const defualt = {}
        return new Promise(resolve => {
            if (hookName in this.hooks) {
                const list = Object.keys(this.hooks[hookName]).map(hook => {
                    return this.hooks[hookName][hook]
                })
                const orderedHooks = filterModule(list, {
                    order: 'order DESC'
                }).map(hook => hook.callback)
                filterBags(defualt, ...orderedHooks).then(result => {
                    resolve(result)
                })
            } else {
                resolve()
            }
        })
    }
    add_action(hookName, action) {
        action.id = action.id || 'ac' + randomString.generate({
            length: 6,
            capitalization: 'lowercase'
        })
        if (hookName in this.hooks) {
            Object.assign(this.hooks[hookName], {
                [action.id]: {
                    callback: action.callback
                }
            });
        } else {
            this.hooks[hookName] = {};
            Object.assign(this.hooks[hookName], {
                [action.id]: {
                    callback: action.callback
                }
            });
        }
    }
}

class HookFilter extends Hook {
    constructor() {
        super();
        this.filter_hooks = []
        this.filter_index = 0;
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
                filterBags(defualt, ...orderedHooks).then(result => {
                    resolve(result)
                })
            } else {
                resolve()
            }
        })
    }
    add_filter(hookName, action) {
        action.id = action.id || 'fi' + randomString.generate({
            length: 6,
            capitalization: 'lowercase'
        })
        if (hookName in this.filter_hooks) {
            Object.assign(this.filter_hooks[hookName], {
                [action.id]: {
                    callback: action.callback,
                    order: action.order || ++this.filter_index
                }
            });
        } else {
            this.filter_hooks[hookName] = {};
            Object.assign(this.filter_hooks[hookName], {
                [action.id]: {
                    callback: action.callback,
                    order: action.order || ++this.filter_index
                }
            });
        }
    }
}
module.exports = HookFilter