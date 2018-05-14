module.exports = (function() {
    return {
        start: function(req, res)  {
            res.locals.baseUrl  = fullUrl = 'http' + '://' + req.get('host')
            res.locals.url = req.originalUrl
            this.done();
        }
    }
}())