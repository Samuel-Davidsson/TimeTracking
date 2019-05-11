import React from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";
import CountDown from "../Helpers/CountDown";
import Logout from "../Helpers/Logout";

const homePageNavBar = props => {
  return (
    <div>
      <Navbar className="navbar-border" color="light" light expand="md">
        <NavbarBrand>Timetracker</NavbarBrand>
        <NavbarBrand hidden={!props.isAuthorized === true}>
          <CountDown />
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                hidden={!props.isAuthorized === true}
                href="/timetracker/notfound"
              >
                Användare
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Samuel-Davidsson">
                GitHub
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="pointer" onClick={Logout}>
                {" "}
                Logga ut
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default React.memo(homePageNavBar);
