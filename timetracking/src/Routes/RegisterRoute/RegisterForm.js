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
import "./Register.css";

export default class RegisterForm extends React.Component {
  loginRef = React.createRef();
  passwordRef = React.createRef();
  firstnameRef = React.createRef();
  lastnameRef = React.createRef();
  departmentRef = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const userRegisterInfo = {
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
      firstname: this.firstnameRef.current.value,
      lastname: this.lastnameRef.current.value,
      department: this.departmentRef.current.value
    };
    this.props.addUser(userRegisterInfo);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup inline>
            <Row form>
              <Col md={6}>
                <Label>Email</Label>
                <Input
                  placeholder="Email.."
                  innerRef={this.loginRef}
                  type="email"
                  required
                />
              </Col>
              <Col md={6}>
                <Label>Lösenord</Label>
                <Input
                  placeholder="Lösenord.."
                  innerRef={this.passwordRef}
                  type="password"
                  required
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row form>
              <Col md={6}>
                <Label>Förnamn</Label>
                <Input
                  placeholder="Förnamn.."
                  innerRef={this.firstnameRef}
                  required
                />
              </Col>
              <Col md={6}>
                <Label>Efternamn</Label>
                <Input
                  placeholder="Efternamn.."
                  innerRef={this.lastnameRef}
                  required
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>Avdelning</Label>
            <CustomInput
              type="select"
              id="something"
              innerRef={this.departmentRef}
              required
            >
              <option>Ekonomi</option>
              <option>IT</option>
              <option>Sälj</option>
              <option>Kundtjänst</option>
            </CustomInput>
          </FormGroup>
          <div>
            <Button
              className="button-register-div"
              onClick={this.props.handleClickOnBackButton}
            >
              Tillbaka
            </Button>
            <Button color="info">Skicka in</Button>
          </div>
        </Form>
      </div>
    );
  }
}
