const React = require('react');
const ReactDOM = require('react-dom');
const {Test}  = require('./service/test');
export class HelloMessage extends React.Component {
    render() {
      return (

        <div>
          Hello {this.props.name}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Test />,
    document.getElementById('app')
  );
