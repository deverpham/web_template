const appConfig = require('../../../app.config');
class PostController {
    constructor() {
        this.PostType = require(appConfig.modelPath+'/post_type');
    }
    async getPost() {
        var result = await this.PostType.findAll({}, {
            raw: true
        })
        return result
    }
    async addPost(data) {
        var post = await this.PostType.create(data);
        return post;
    }
}
module.exports = new PostController();