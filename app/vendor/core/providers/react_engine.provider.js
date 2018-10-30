
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var _escaperegexp = require('lodash.escaperegexp');
class ReactEngine {
    load(opts) {
        this.opts = opts;
        const onlyPath = opts.only
        console.log(onlyPath)
        require('babel-register')(
            {
                only: onlyPath,
                presets: [
                    'react',
                    [
                        'env',
                        {
                            targets: {
                                node: 'current',
                            },
                        },
                    ],
                ]
            }
        );
    }
    render(file, option, cb) {
        let moduleDetectRegEx = new RegExp(
            []
                .concat(this.opts.only)
                .map(viewPath => '^' + _escaperegexp(viewPath))
                .join('|')
        );
        try {
            let component = require(file);
            // Transpiled ES6 may export components as { default: Component }
            component = component.default || component;
            const result = ReactDOMServer.renderToStaticMarkup(
                React.createElement(component, option)
            );
            return cb(null, result);
        } catch (e) {
            return cb(e);
        } finally {
            Object.keys(require.cache).forEach(function (module) {
                if (moduleDetectRegEx.test(require.cache[module].filename)) {
                    delete require.cache[module];
                }
            });
        }
    }
}
module.exports = new ReactEngine();