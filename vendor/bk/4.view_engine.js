const ejs = require('ejs')
const path = require('path');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const glob = require('glob')
const fs = require('fs')
const headContent = ejs.compile(fs.readFileSync(path.join(__dirname, './ui/template/head.html')).toString())
const footContent = ejs.compile(fs.readFileSync(path.join(__dirname, './ui/template/foot.html')).toString())



module.exports = (function() {
    return {
        init : () => {
            APP.engine('html', async (filepath, options, callback) => {
                var helpers = {
                    css :false,
                    js: false
                }
                if(fs.existsSync(path.join(__dirname, `../../src/superTheme/dist/helper.bundle.css`))) {
                    helpers.css = true
                }
                if(fs.existsSync(path.join(__dirname, `../../src/superTheme/dist/helper.bundle.js`))) {
                    helpers.js = true
                }
                if(fs.existsSync(path.join(__dirname, `../../src/superTheme/dist/${path.basename(filepath).split('.')[0]}.js`))) {
                    foot = footContent(Object.assign({
                        js: true,
                        helpers: helpers,
                        name: path.basename(filepath).split('.')[0]
                    }, options))
                } else {
                    foot = footContent(Object.assign({
                        js: false,
                        helpers: helpers
                    }, options))
                }
                if(fs.existsSync(path.join(__dirname, `../../src/superTheme/dist/${path.basename(filepath).split('.')[0]}.css`))) {
                    head = headContent(Object.assign({
                        css: true,
                        helpers: helpers,
                        name: path.basename(filepath).split('.')[0]
                    }, options))
                } else {
                    head = headContent(Object.assign({
                        css: false,
                        helpers: helpers
                    }, options))
                }
                
                ejs.resolveInclude = (name, filename) => {
                    pathName = path.join(path.dirname(filename), name) + '.html';
                    return pathName;
                }
                listHelpers  = glob.sync(path.join(__dirname,'../../src/superTheme/views/helpers/*.html'));
                listHelpers.map(helper => {
                    var name = path.basename(helper).replace('.html', '');
                    var content = fs.readFileSync(helper).toString();
                    eval(`${name} = ejs.compile(content)`);
                })
                try {
                const renderHtml = await ejs.renderFile(filepath,options);
                const headerHTML = await ejs.renderFile(path.join(__dirname, '../../src/superTheme/views/template/header.html'), options);
                const footerHTML = await ejs.renderFile(path.join(__dirname, '../../src/superTheme/views/template/footer.html'), options);
                const html =headerHTML+renderHtml+ footerHTML;
                callback(null, minify(html, {
                    collapseWhitespace: true,
                    removeEmptyAttributes: true
                }));
            } catch(err) {
                    callback(err.toString())
                }
            })

            APP.set('view engine', 'html');
            APP.set('views', path.join(__dirname,'../../src/superTheme/views/'))
        }
    }
}())