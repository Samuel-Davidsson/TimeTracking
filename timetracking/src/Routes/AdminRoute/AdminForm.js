import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const adminForm = props => {
  return (
    <div className="adminform-form" hidden={props.reportId === 0}>
      <Form onSubmit={props.handleCheckboxesSubmit}>
        <FormGroup check>
          <Label />
          <Input
            type="checkbox"
            checked={props.attest}
            onChange={props.handleAttestCheckBoxStatus}
          />{" "}
          Attestera
        </FormGroup>
        <FormGroup check>
          <Label />
          <Input
            type="checkbox"
            checked={props.accepted}
            onChange={props.handleAcceptedCheckBoxStatus}
          />{" "}
          Låsa upp
        </FormGroup>
        <div className="adminform-button">
          <Button
            color="info"
            type="submit"
            onClick={props.handleCheckBoxClicked}
          >
            Spara
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default React.memo(adminForm);
