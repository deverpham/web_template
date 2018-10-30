require("babel-register")(
    Object.assign({}, {
        presets: [
            "react",
            [
                "env",
                {
                    targets: {
                        node: "current"
                    }
                }
            ]
        ],
        cache: false
    })
);
("use strict");
var ReactDOMServer = require('react-dom/server');
var React = require('react')

setInterval(function () {
    console.log('start');
    const component = require('./views/index.jsx')

    const result = ReactDOMServer.renderToStaticMarkup(
        React.createElement(component)
    );
    console.log(result)
    console.log('end');
}, 2000)