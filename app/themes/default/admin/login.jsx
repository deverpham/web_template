const React = require("react");
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
class LoginPage extends React.Component {
  constructor() {
    super();
    console.log(this);
  }
  onChange() {
    console.log("gg");
  }
  onSubmit(e: Event) {
    const $this = window;
    const username = $this.username.value;
    const password = $this.password.value;
    return e.preventDefault();
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <ControlLabel for="username">Username</ControlLabel>
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
