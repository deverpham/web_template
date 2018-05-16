function checkPersCent(percents) {
    if(percents < 0 || percents > 4) {
        return false;
    } else {
        return true;
    }
}
module.exports = {
    checkPersCent
}