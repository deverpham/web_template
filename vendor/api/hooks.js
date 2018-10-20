
class Hook {
    constructor() {
        this.hooks = {}
    }
    do_action(hookName) {
        if (hookName in this.hooks) {
            Object.keys(this.hooks[hookName]).map(action => {
                this.hooks[hookName][action]()
            })
        }
    }
    add_action(hookName, action) {
        if (hookName in this.hooks) {
            Object.assign(this.hooks[hookName], { [action.id]: action.callback });
        } else {
            this.hooks[hookName] = {};
            Object.assign(this.hooks[hookName], { [action.id]: action.callback });
        }
    }
}
module.exports = new Hook();