/**
 * @typedef {Object} ItemOptions
 * @property {string} link
 * @property {string} name
 */
class AdminAPI {
    /**
     * 
     * @param {ItemOptions} opts 
     * @param {Object} hookAPI
     */
    addMenuItem(hookAPI, opts) {
        const html = `
        <li>
            <a href = '${opts.link}'>
            ${opts.name}
            </a>
        </li>
        `
        hookAPI.add_action('MENU_DASHBOARD', {
            callback: function (oldData) {
                oldData = oldData || '';
                return oldData + html;
            }
        })
    }
}
module.exports = new AdminAPI();