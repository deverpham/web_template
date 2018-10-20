module.exports = function (req, res, next) {
    res.renderStream = function (html) {
        return res.write(html)
    }
    next();
}