const SUCCESS_STATUS = 'success';
const ERROR_STATUS = 'error';
const ERROR_STATUS_CODE = 400;
module.exports = (function() {
    return {
        init : function(req, res) {

            res.success = function(message) {
                res.json({
                    status: SUCCESS_STATUS,
                    message
                })
            }

            res.error = function(message) {
                res.status(ERROR_STATUS_CODE).json({
                    status: ERROR_STATUS,
                    message
                })
            }
            this.done();
        }
    }
}())