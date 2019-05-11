import React, { useState } from "react";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import "./Register.css";

const registerForm = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const userRegisterInfo = {
      login: login,
      password: password,
      confirmpassword: confirmpassword,
      firstName: firstName,
      lastName: lastName,
      department: department
    };
    props.addUser(userRegisterInfo);
  };

  return (
    <div>
      <Form className="register-form" onSubmit={handleSubmit}>
        <p className="register-comment">
          Registera dig för att kunna logga in.
        </p>
        <FormGroup className="register-formgroup" row>
          <Label className="register-label" sm={2}>
            Inlogg:
          </Label>
          <Col md={6}>
            <Input
              placeholder="Användarnamn(email).."
              value={login}
              onChange={e => setLogin(e.target.value)}
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
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={e => setLastName(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              value={confirmpassword}
              onChange={e => setConfirmpassword(e.target.value)}
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
              value={department}
              onChange={e => setDepartment(e.target.value)}
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
            onClick={props.handleClickOnBackButton}
          >
            Tillbaka
          </Button>
          <Button color="info">Skicka in</Button>
        </div>
      </Form>
    </div>
  );
};
export default registerForm;
