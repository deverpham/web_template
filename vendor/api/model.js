const {
    UserModel
} = require('../core/database');

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
class ModelAPI {
    constructor(name) {
        this.Model = eval(` (${name})`)
    }
    getForm(type, fields) {
        const props = this.Model.rawAttributes;
        let html = ``
        html += `
            <form action='' method='post'>
        `
        switch (type) {
            default:
                {
                    fields.map(field => {
                        html += getDom(props[field])

                    })
                    html += `<button type ='submit'>Submit</button>`
                    return html
                }
        }
    }
}
module.exports = ModelAPI;