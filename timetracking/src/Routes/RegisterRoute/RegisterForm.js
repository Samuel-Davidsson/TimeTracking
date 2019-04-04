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
      <div className="register-div">
        <Form className="register-form" onSubmit={this.handleSubmit}>
          <FormGroup inline>
            <Row form>
              <Col md={4}>
                <Label className="register-form-label-email">
                  Användarnamn
                </Label>
                <Input
                  placeholder="Mail.."
                  innerRef={this.loginRef}
                  className="register-input-left"
                  type="email"
                  required
                />
              </Col>
              <Col md={4}>
                <Label className="register-form-label-department">
                  Avdelning
                </Label>
                <CustomInput
                  type="select"
                  id="something"
                  innerRef={this.departmentRef}
                  required
                  className="register-form-input-department"
                >
                  <option>Ekonomi</option>
                  <option>IT</option>
                  <option>Sälj</option>
                  <option>Kundtjänst</option>
                </CustomInput>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row form>
              <Col md={4}>
                <Label className="register-form-label-firstname">Förnamn</Label>
                <Input
                  placeholder="Förnamn.."
                  innerRef={this.firstnameRef}
                  className="register-input-left"
                  required
                />
              </Col>
              <Col md={4}>
                <Label className="register-form-label-lastname">
                  Efternamn
                </Label>
                <Input
                  placeholder="Efternamn.."
                  innerRef={this.lastnameRef}
                  className="register-input-right"
                  required
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row form>
              <Col md={4}>
                <Label className="register-form-label-password">Lösenord</Label>
                <Input
                  placeholder="Lösenord.."
                  innerRef={this.passwordRef}
                  className="register-input-right"
                  type="password"
                  required
                />
              </Col>
              <Col md={4}>
                <Label className="register-form-label-password">Bekräfta</Label>
                <Input
                  placeholder="Lösenord.."
                  innerRef={this.passwordRef}
                  className="register-input-right"
                  type="password"
                />
              </Col>
            </Row>
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
