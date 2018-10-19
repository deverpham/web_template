module.exports = (function () {
    return {
        init: function (req, res) {
            const checker = new MonitorAPI(true);
            loggerAPI.error(new Date())
            checker
                .analytic()
                .then(result => loggerAPI.debug(JSON.stringify(result)))
            this.done();
        }
    }
}())