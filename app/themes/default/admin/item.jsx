const React = require("react");
class Item extends React.Component {
  render() {
    return <h1>{this.props.name}</h1>;
  }
}
module.exports = Item;
