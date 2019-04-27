import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default class AdminForm extends React.Component {
  render() {
    return (
      <div className="test-main">
        <Form className="test" onSubmit={this.props.handleCheckboxesSubmit}>
          <FormGroup check>
            <Label check />
            <Input
              type="checkbox"
              checked={this.props.attest}
              onChange={this.props.handleAttestCheckBoxStatus}
            />{" "}
            Attestera
          </FormGroup>
          <FormGroup check>
            <Label check />
            <Input
              type="checkbox"
              checked={this.props.approved}
              onChange={this.props.handleApprovedCheckBoxStatus}
            />{" "}
            Låsa upp
          </FormGroup>
          <div className="test-button">
            <Button
              color="info"
              type="submit"
              onClick={this.props.handleCheckBoxClicked}
            >
              Spara
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
