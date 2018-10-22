const React = require('react');
const ReactDOM = require('react-dom');
const {Menu} = require('./admin/menu');
const {Layout} = require('./admin/layout');
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
export class HelloMessage extends React.Component {

    componentDidMount() {
        console.log(this.props)
    }
    render() {
        
      return (
          <Router>
              <div className='row'>
                    <Menu />
                    <Layout />
              </div>
            </Router>
          
      );
    }
  }
  
  ReactDOM.render(
    <HelloMessage />,
    document.getElementById('app')
  );
