const React = require('react');
const {Link} = require('react-router-dom');
export class Menu extends React.Component {
    render() {
        return (
            <div className='col-3'>
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                 <Link to='/category'   className = 'nav-link'>Category</Link> 
               
                </div>
            </div>
        )
    }
}