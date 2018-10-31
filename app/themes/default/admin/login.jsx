const React = require("react");
import ReactLoading from 'react-loading';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
class LoginPage extends React.Component {

  onChange() {
    console.log("gg");
  }
  onSubmit(e: Event) {
    const $this = window;
    const username = $this.username.value;
    const password = $this.password.value;
    console.log(username, password)
    $($this.loadingbar).remove();
    return e.preventDefault();
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <ReactLoading id='loadingbar' type={'balls'} color={'spinningBubbles'} />
          <ControlLabel htmlFor="username">Username</ControlLabel>
          <FormControl
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            onChange={this.onChange}
          />
          <ControlLabel for="username">password</ControlLabel>
          <FormControl
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={this.onChange}
          />
        </FormGroup>
        <Button bsStyle="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}
module.exports = LoginPage;
