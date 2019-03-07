import React from "react";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import Header from "../../Header";
import "./Register.css";

export default class Register extends React.Component {
  handleBackwardsClick = () => {
    this.props.history.push("/timetracker");
  };

  render() {
    return (
      <div className="register-div">
        <Header />
        <Form>
          <FormGroup inline>
            <Row form>
              <Col md={6}>
                <Label>Email</Label>
                <Input placeholder="Email.." />
              </Col>
              <Col md={6}>
                <Label>Lösenord</Label>
                <Input placeholder="Lösenord.." />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row form>
              <Col md={6}>
                <Label>Förnamn</Label>
                <Input placeholder="Förnamn.." />
              </Col>
              <Col md={6}>
                <Label>Efternamn</Label>
                <Input placeholder="Efternamn.." />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>Avdelning</Label>
            <CustomInput type="select" id="something">
              <option>Välj avdelning..</option>
              <option>Ekonomi</option>
              <option>IT</option>
              <option>Sälj</option>
              <option>Kundtjänst</option>
            </CustomInput>
          </FormGroup>
          <div>
            <Button
              className="button-register-div"
              onClick={this.handleBackwardsClick}
            >
              Tillbaka
            </Button>
            <Button color="success">Skicka in</Button>
          </div>
        </Form>
      </div>
    );
  }
}
