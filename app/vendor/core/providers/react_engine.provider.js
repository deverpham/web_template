var React = require('react');
var ReactDOMServer = require('react-dom/server');
var _escaperegexp = require('lodash.escaperegexp');
const uniqid = require('uniqid');
class ReactEngine {
    load(opts) {
        this.opts = opts;
        const onlyPath = opts.only
        console.log(onlyPath)
        require('babel-register')({
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
        });
    }

    event_render(instance) {
        let script = '';

        function collectEvents(instance) {
            const {
                props
            } = instance;
            let {
                children,
                id
            } = props;
            if (children != undefined) {
                if (children.length == undefined) {
                    return collectEvents(children)
                } else {
                    if (typeof children != 'string') {
                        children.map(child => collectEvents(child))
                    }
                }
            }
            if (id == undefined) id = uniqid.process('v');
            const propKeys = Object.keys(props);
            const exists = ['onChange', 'onClick'].filter(event => propKeys.indexOf(event) != -1)
            exists.map(exist => {
                const words = exist.split(/(?=[A-Z])/)
                if (words.length > 0) {
                    const eventName = words[1];
                    script += `
                    const ${id} = document.getElementById('${id}');
                    ${id}.addEventListener('${eventName.toLowerCase()}', ${props[exist]})
        `
                    //console.error(scriptString);
                }
            })
            return script;
        }
        const event = collectEvents(instance);
        return event;
        //console.log(event)
        //console.log(event);
    }
    appendID(render) {

        function collectEvents(instance) {
            const {
                props
            } = instance;
            let {
                children,
                id
            } = props;
            if (children != undefined) {
                if (children.length == undefined) {
                    return collectEvents(children)
                } else {
                    if (typeof children != 'string') {
                        children.map(child => collectEvents(child))
                    }
                }
            }
            if (id == undefined) id = uniqid.time();
            return instance;
        }
        const newObject = collectEvents(render);
        console.log(newObject);
        return newObject;
    }
    render(file, option) {

        let moduleDetectRegEx = new RegExp(
            []
            .concat(this.opts.only)
            .map(viewPath => '^' + _escaperegexp(viewPath))
            .join('|')
        );
        try {
            let component = require(file);
            component = component.default || component;
            const Node = React.createFactory(component);
            const instance = new component(option);
            const render = instance.render();
            //this.appendID(render);
            const scriptString = this.event_render(render);
            const html = ReactDOMServer.renderToStaticMarkup(render);
            return [html, scriptString]
        } catch (e) {
            throw (e);
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