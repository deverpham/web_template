const {
    app
} = require('../express')
class ViewAPI {
    constructor() {
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
    }
    addEngine(name, func) {
        return app.engine(name, func)
    }
    setEngine(name) {
        return app.set('view engine', name)
    }
    addScript(res, script) {
        const hookAPI = res.locals.hookAPI;
        hookAPI.add_action('RESPONSE_HEAD_T', {
            callback: async function () {
                switch (script.type) {

                    case 'link':
                        {
                            return res.write(`<script src = ${script.content}></script>`)
                        }
                        /**
                         * case text
                         */
                    default:
                        {
                            return res.write(`<script>${script.content}</script>`)
                        }
                }
            }
        })
    }
}
module.exports = new ViewAPI()