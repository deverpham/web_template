
/**
 * Filter Bags for projects
 * @param {object} projects
 * @param {function} args
 * @return {Promise}
 */
async function filterBags(projects, ...args) {
    const newProjects = await args[0](projects);
    const newArgs = args.slice(1);
    if (newArgs.length > 0 && newProjects.length > 0) return await filterBags(newProjects, ...newArgs);
    else return newProjects;
}
module.exports = { filterBags }
