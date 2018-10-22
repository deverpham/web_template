const React = require('react');
import {Modal,Button} from 'react-bootstrap'
export class Crud extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    handleShow() {
        console.log(this)
        this.setState({
            show:true
        })
        console.log(this.state)
    }
    render() {
        return (
            <div className='row'>
                <Button bsStyle='primary' onClick={this.handleShow.bind(this)}>Add</Button> 
                <Modal.Dialog show={false}>
                    <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>One fine body...</Modal.Body>

                    <Modal.Footer>
                    <Button>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}