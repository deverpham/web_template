const router = require('express').Router();
const postController = require('./post.controller');
router.get('/', async (req, res) => {
    var result = await postController.getPost();
    res.json(result);
})
router.post('/', async(req, res) => {
    var post = await postController.addPost(req.body);
    return post;
})
module.exports = router;