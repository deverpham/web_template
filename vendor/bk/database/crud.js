
const CrudController = require('./crud.controller');
module.exports = (Model) => {
    var router = require('express').Router();
    var name  = Model.getTableName().toLowerCase();
    console.log(name)
    var crud = new CrudController(Model);
    router.get('/', async (req, res) => {
        var result = await crud.get();
        res.json(result);
    })
    router.get('/:filter', async (req, res) => {
        var filter = JSON.parse(req.params.filter);
        var result = await crud.getByFilter(filter);
        res.json(result);
    })
    router.post('/', async (req, res) => {
        console.log(req.body)
        var result = await crud.add(req.body);
        res.json(result);
    })
    router.patch('/', (req, res) => {

    })
    router.delete('/', (req, res) => {

    })
    APP.use(`/db/${name}`,router);
}