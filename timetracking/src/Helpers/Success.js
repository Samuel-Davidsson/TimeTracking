import React from "react";
export default class Success extends React.Component {
  render() {
    return (
      <div>
        <p className="success-msg">{this.props.successmsg}</p>
      </div>
    );
  }
}
