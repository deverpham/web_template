const {
    UserModel
} = require('../core/database');
const ejs = require('ejs')

function getTypeDOM(type) {
    switch (type) {
        case 'password':
            {
                return 'password'
            }
        default:
            {
                return 'text'
            }
    }
}

function getDom(field) {

    let type = field.type.toString()
    const fieldName = field.fieldName;
    if (fieldName == 'password') {
        type = 'password'
    }
    const modelName = field.Model.name
    if (field.autoIncrement) {
        return ''
    }
    switch (type) {
        default:
            {
                return `
            <div>
                <label for = ${fieldName}> ${fieldName} :</label>
                <input type = '${getTypeDOM(type)}' name = '${fieldName}' id = '${modelName}_${fieldName}' />
            </div>`
            }
    }

}

/**
 * 
 * @param {Array} fields a list of field
 */
function getDomsHTML(fields) {
    let html = ``
    fields.map(field => html += getDom(field))
    return html;
}
class ModelAPI {
    constructor(name) {
        this.Model = eval(` (${name})`)
    }
    /**
     * render a template with fields
     * @param {Array} fields a list of property objects 
     * @param {string} templatePath path of template Name
     * @param {object} hookAPI  hookAPI in template ejs
     */
    getFormTemplate(fields, templatePath, hookAPI) {
        const props = this.Model.rawAttributes;
        const dataFields = fields.map(field => props[field])
        return ejs.renderFile(templatePath, {
            dataFields,
            hookAPI,
            getDOM: getDom,
            getDOMS: getDomsHTML,
        }, {
            async: true
        })

    }
}
module.exports = ModelAPI;