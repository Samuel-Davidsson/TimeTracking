import React from "react";
export default class Success extends React.Component {
  render() {
    return (
      <div>
        <p className="text-success">{this.props.success}</p>
      </div>
    );
  }
}
