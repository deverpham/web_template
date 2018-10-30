const React = require("react");
const Item = require("./item");
class Test extends React.Component {
  render() {
    return (
      <div>
        <Item name="thinh" />
      </div>
    );
  }
}
module.exports = Test;
