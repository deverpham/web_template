const express = require('express');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../resources'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage})
module.exports = (function() {
    return {
        init: () => {
            APP.use('/resources', express.static(path.join(__dirname, '../../resources')));
            APP.get('/libraries', (req, res) => {
                var isFolderExists = fs.existsSync(path.join(__dirname, '../../resources'));
                if(isFolderExists) {
                    var files = glob.sync(path.join(__dirname,'../../resources/**/*.+(jpg|png)')).map(file => {
                        var pathname = path.join(__dirname, '../../resources');
                        return {
                            path: "http://localhost:8080/resources"+file.replace(pathname, ''),
                            name: path.basename(file)
                        }
                    })
                    res.json(files);
                } else {
                    res.json([])
                }
            })
            APP.post('/libraries', upload.single('file'),( req, res) => {
                var pathname = path.join(__dirname, '../../resources');
                var urlImg = "http://localhost:8080/resources" + req.file.path.replace(pathname, '');
              res.json({
                  status: 'success',
                  location: urlImg
              });  
            })
            APP.delete('/libraries', (req, res)  => {
                var pathImg = req.body.path.replace('http://localhost:8080/resources', '');
                fs.unlinkSync(path.join(__dirname, '../../resources', pathImg));
                res.send('completed');
            })
        }
    }
}())