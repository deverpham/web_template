const React = require("react");
const Item = require("./helpers/item.jsx");
const Input = require("./input");
const {
  Button,
  FormControl,
  FormGroup,
  ControlLabel
} = require("react-bootstrap");
class Form extends React.Component {
  constructor() {
    super();
    this.fkprop = {
      title: "thinh",
      inputs: [
        {
          nodeName: "label",
          innerText: "User Name",
          className: "form-control"
        },
        {
          nodeName: "input",
          innerText: "",
          className: "form-control"
        }
      ]
    };
    this.state = {
      value: "thinh"
    };
  }
  componentWillMount() {
    this.props.eventRender(this.render());
    return;
    console.log(Input);
    const results = this.render();
    console.log(results.props.children.props.children[0].props.onClick);
    return;
    const View = React.createFactory(Button);
    const view = View();
    const instance = new view.type({});
    const render = instance.render();
    Object.keys(render.props).map(key => {
      if (["onClick"].indexOf(key) !== -1) {
        console.log(render.props[key]);
        item.events[key] = render.props[key]; //check if type is function.
      }
    });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }
  cal() {
    alert("yeah");
    console.log("hehe");
  }
  render() {
    return (
      <div
        ref={el => {
          this.el = el;
        }}
      >
        <form>
          <h1 onClick={() => {}} id="h1" />
          <Input />
          <ControlLabel
            onClick={() => {}}
            id="control"
            htmlFor="text"
            style={{
              color: "red",
              border: "green",
              display: "none"
            }}
          >
            Working example with validation
          </ControlLabel>
          <FormControl
            id="ok"
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={() => {
              console.log("changed");
            }}
          />
          <Button
            id="loginbtn"
            onClick={function() {
              alert("gg");
            }}
          >
            Click me
          </Button>
        </form>
      </div>
    );
  }
}
module.exports = Form;
