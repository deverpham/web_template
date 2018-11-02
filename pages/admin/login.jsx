const React = require("react");
export default class Home extends React.Component {
  login() {
    alert("login");
  }
  render() {
    return (
      <form>
        <label htmlFor="user">user name</label>
        <input type="text" name="user" />

        <label htmlFor="user">password</label>
        <input type="text" name="password" />
        <button className="btn btn-primary" onClick={this.login}>
          {" "}
          submit
        </button>
      </form>
    );
  }
}
