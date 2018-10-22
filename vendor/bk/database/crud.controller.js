const appConfig = require('../../../app.config');
class CrudController {
    constructor(model) {
        this.model = model;
    }
    async get() {
        var result = await this.model.findAll({}, {
            raw: true
        })
        return result
    }
    async getByFilter(filter) {
        var result = await this.model.findAll(filter, {
            raw:true
        });
        return result;
    }
    async add(data) {
        console.log(this.model)
        var post = await this.model.create(data);
        return post;
    }
}
module.exports = CrudController;