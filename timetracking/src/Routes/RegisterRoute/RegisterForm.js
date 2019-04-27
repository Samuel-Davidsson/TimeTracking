import React from "react";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Error from "../../Helpers/Error";
import Success from "../../Helpers/Success";
import "./Register.css";

export default class RegisterForm extends React.Component {
  loginRef = React.createRef();
  passwordRef = React.createRef();
  confirmpasswordRef = React.createRef();
  firstnameRef = React.createRef();
  lastnameRef = React.createRef();
  departmentRef = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const userRegisterInfo = {
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
      confirmpassword: this.confirmpasswordRef.current.value,
      firstname: this.firstnameRef.current.value,
      lastname: this.lastnameRef.current.value,
      department: this.departmentRef.current.value
    };
    this.props.addUser(userRegisterInfo);
  };

  render() {
    return (
      <div>
        <Form className="register-form" onSubmit={this.handleSubmit}>
          <FormGroup className="register-formgroup" row>
            <Label className="register-label" sm={2}>
              Inlogg:
            </Label>
            <Col md={6}>
              <Input
                placeholder="Användarnamn(email).."
                innerRef={this.loginRef}
                type="email"
                required
                className="register-input"
              />
            </Col>
          </FormGroup>
          <FormGroup className="register-formgroup" row>
            <Label className="register-label" sm={2}>
              Förnamn:
            </Label>
            <Col md={6}>
              <Input
                placeholder="Förnamn.."
                innerRef={this.firstnameRef}
                required
                className="register-input"
              />
            </Col>
          </FormGroup>
          <FormGroup className="register-formgroup" row>
            <Label className="register-label" sm={2}>
              Efternamn:
            </Label>
            <Col md={6}>
              <Input
                placeholder="Efternamn.."
                innerRef={this.lastnameRef}
                required
                className="register-input"
              />
            </Col>
          </FormGroup>
          <FormGroup className="register-formgroup" row>
            <Label className="register-label" sm={2}>
              Lösenord:
            </Label>
            <Col md={6}>
              <Input
                placeholder="Lösenord.."
                innerRef={this.passwordRef}
                type="password"
                required
                className="register-input"
              />
            </Col>
          </FormGroup>
          <FormGroup className="register-formgroup" row>
            <Label className="register-label" sm={2}>
              Bekräfta:
            </Label>
            <Col md={6}>
              <Input
                placeholder="Bekräfta lösenord.."
                innerRef={this.confirmpasswordRef}
                type="password"
                className="register-input"
              />
            </Col>
          </FormGroup>
          <FormGroup className="register-formgroup">
            <Label className="register-department-label" sm={2}>
              Avdelning:
            </Label>
            <Col sm={4}>
              <CustomInput
                type="select"
                innerRef={this.departmentRef}
                id="justgottahaveone"
                required
                className="register-department-input"
              >
                <option>Ekonomi</option>
                <option>IT</option>
                <option>Sälj</option>
                <option>Kundtjänst</option>
              </CustomInput>
            </Col>
          </FormGroup>

          <div>
            <Button
              className="button-register-div"
              onClick={this.props.handleClickOnBackButton}
            >
              Tillbaka
            </Button>
            <Button color="info">Skicka in</Button>
            <Success success={this.props.success} />
            <Error error={this.props.error} />
          </div>
        </Form>
      </div>
    );
  }
}
