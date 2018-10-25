const fs = require('fs');
/**
 * parse a file text to json Object
 * @param {string} filepath 
 * @return {object} if fielpath exist
 * @return {null} if else
 */
function parseFromFile(file_path) {
    if (
        fs.existsSync(file_path) &&
        fs.lstatSync(file_path).isFile()
    ) {

        try {
            return JSON.parse(fs.readFileSync(file_path))
        } catch (err) {
            return null;
        }
    }
    return null;
}
module.exports = {
    parseFromFile
}