import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default class AdminForm extends React.Component {
  render() {
    return (
      <div className="adminform-form">
        <Form onSubmit={this.props.handleCheckboxesSubmit}>
          <FormGroup check>
            <Label />
            <Input
              type="checkbox"
              checked={this.props.attest}
              onChange={this.props.handleAttestCheckBoxStatus}
            />{" "}
            Attestera
          </FormGroup>
          <FormGroup check>
            <Label />
            <Input
              type="checkbox"
              checked={this.props.accepted}
              onChange={this.props.handleAcceptedCheckBoxStatus}
            />{" "}
            Låsa upp
          </FormGroup>
          <div className="adminform-button">
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
