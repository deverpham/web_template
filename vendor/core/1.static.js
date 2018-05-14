const express = require('express');
const path = require('path');

module.exports = (function() {
    return {
        init: () => {
            APP.use('/core', (req, res, next) => { 
                next();
            } ,express.static(path.join(__dirname, './ui/dist')))
            APP.use('/theme',express.static(path.join(__dirname, '../../src/superTheme/dist')))
            APP.use('/theme/assets',express.static(path.join(__dirname, '../../src/superTheme/public/images')))
        }
    }
}())