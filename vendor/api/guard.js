class SettingInterFace {
    constructor() {
        /**
         * @type {string} string
         */
        this.name = '';
        this.callbackUrl = '';
        this.exceptRoute = '';
    }
}
class GuardAPIInTerFace {

    constructor(setting) {
        this.name = setting.name;
        this.callbackUrl = setting.callbackUrl || '';
        this.exceptRoute = setting.exceptRoute || []
    }
    /**
     * @return {Promise}
     */
    canActivate() {
        return false;
    }
    setCallbackUrl(callbackUrl) {
        this.callbackUrl = callbackUrl;
    }
    isExceptRoute(route) {
        if (this.exceptRoute.indexOf(route) != -1) return true;
        return false;
    }
    setExceptRoute(route) {
        return this.exceptRoute.push(route)
    }
    listen() {
        return async (req, res, next) => {
            const nowRoute = req.path;
            if (this.isExceptRoute(nowRoute) || await this.canActivate()) next();
            else {
                res.redirect(this.callbackUrl)
                return;
            }
        }
    }
}
class GuardAPI extends GuardAPIInTerFace {
    /**
     * 
     * @param {SettingInterFace} setting 
     */
    constructor(setting) {
        super(setting);
    }
}
module.exports = GuardAPI