module.exports = async function() {
    const config = await model.Config.findOne({
        raw: true
    });
    return config;
}