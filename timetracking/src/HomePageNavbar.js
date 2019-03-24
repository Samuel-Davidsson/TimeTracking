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
        <Navbar className="navbar-main-color" expand="md">
          <Collapse navbar>
            <NavItem>
              <NavbarBrand className="mr-auto">
                <CountDown />
              </NavbarBrand>
            </NavItem>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  className="navbar-color"
                  href="https://github.com/Samuel-Davidsson"
                >
                  Github
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="navbar-color" nav caret>
                  Settings
                </DropdownToggle>
                <DropdownMenu className="bg-dark" right>
                  <DropdownItem className="navbar-color">Profil</DropdownItem>
                  <DropdownItem className="navbar-color">Historik</DropdownItem>
                  <DropdownItem className="navbar-color" divider />
                  <DropdownItem onClick={Logout} className="navbar-color">
                    Logga ut
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
