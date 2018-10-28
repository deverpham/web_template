class Store {
    _set(name, payload) {
        if (name in this) {
            this[name] = {
                ...this[name],
                payload
            }
        } else {
            this[name] = payload
        }
        return this[name];
    }
    _get(name) {
        return this[name]
    }
    config() {
        const alias = 'configStore';
        return {
            get: () => {
                return this._get(alias)
            },
            set: (payload) => {
                return this._set(alias, payload)
            }
        }
    }

}
const store = new Store();
module.exports = store;