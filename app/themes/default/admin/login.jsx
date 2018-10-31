const React = require("react");
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import FormSubmit from "../templates/forms/submit";
class LoginPage extends React.Component {
  onChange() {
    console.log("gg");
  }
  onSubmit(e: Event) {
    const $this = window;
    const username = $this.username.value;
    const password = $this.password.value;
    console.log(username, password);
    $($this.loadingbar).remove();
    return e.preventDefault();
  }
  componentWillMount() {
    this.items = [
      {
        class: "input",
        label: "username"
      },
      {
        class: "input",
        label: "password",
        props: {
          type: "password"
        }
      },
      {
        class: "button",
        label: "Submit",
        props: {
          color: "primary"
        }
      }
    ];
  }
  render() {
    return (
      <FormSubmit method="post" action="/admin/login" items={this.items} />
    );
  }
}
module.exports = LoginPage;
