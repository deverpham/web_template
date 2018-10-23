/**
 * Filter Bags for projects
 * @param {any} default
 * @param {function} args
 * @return {Promise}
 */
async function filterBags(defaultValue, ...args) {
    const newValue = await args[0](defaultValue);
    const newArgs = args.slice(1);
    if (newArgs.length > 0) return await filterBags(newValue, ...newArgs);
    else return newValue;
}
/**
 * Filter Bags for projects
 * @param {any} default
 * @param {function} args
 * @return {Promise}
 */
async function actionPipe(defaultValue, ...args) {
    const newValue = await args[0](defaultValue);
    const newArgs = args.slice(1);
    if (newArgs.length > 0) return await actionPipe(newValue, ...newArgs);
    else return newValue;
}
module.exports = {
    filterBags,
    actionPipe
}