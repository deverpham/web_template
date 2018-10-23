const Model = require('./model')
const User = new Model('UserModel');
const Hook = require('./hooks')
const hookAPI = new Hook();
const themeAPI = require('./theme');
const path = require('path');
const assert = require('assert');

/**
 * //STATUS: DONE
 */
/*
it('getFormTemplate', function (done) {
    themeAPI.setTheme(path.join(__dirname, '../../themes/deverpham'))
    User.getFormTemplate(
        ['username', 'password'],
        themeAPI.getAdminTemplatePath('login/loginform.ejs'),
        hookAPI).then(result => {
        if (result.indexOf('user_username') !== -1) {
            return done()
        } else {
            return done(new Error('error html string'))
        }
    })

})
*/
it('test_double_hook_action', async function () {

    hookAPI.add_action('DO_IT', {
        callback: async function () {
            themeAPI.setTheme(path.join(__dirname, '../../themes/deverpham'))
            const result = await User.getFormTemplate(
                ['username', 'password'],
                themeAPI.getAdminTemplatePath('login/loginform.ejs'),
                hookAPI)
            console.log(result)
            return result;
        }
    })
    hookAPI.add_action('DO_IT', {
        callback: function () {
            console.log('ok_test_2')
        }
    })
    await hookAPI.do_action('DO_IT')
})