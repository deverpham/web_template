const React = require('react');
const { Route, Link, HashRouter, Switch} = require('react-router-dom');
const {Category} = require('./components/category');
export class Layout extends React.Component {
    render() {
        return (
            <div className ='col-9'>
               <Route  exact path= {"/category"} component = {Category}/>
            </div>
        )
    }
}