import React from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import "./App.css";
import CountDown from "./Helpers/CountDown";
import Logout from "./Helpers/Logout";

export default class HomePageNavBar extends React.Component {
  logout() {
    localStorage.clear();
    window.location.href = "/timetracker";
  }
  render() {
    return (
      <div>
        <Navbar className="navbar-border" color="light" light expand="md">
          <NavbarBrand>Timetracker</NavbarBrand>
          <NavbarBrand hidden={!this.props.isAuthorized}>
            <CountDown />
          </NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/Samuel-Davidsson">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Settings
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Profil</DropdownItem>
                  <DropdownItem>Historik</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={Logout}>Logga ut</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
