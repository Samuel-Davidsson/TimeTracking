import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import CountDown from "../Helpers/CountDown";
import Logout from "../Helpers/Logout";

const HomePageNavBar = props => {
  return (
    <Navbar className="Navbar" color="light" light expand="md">
      <h3>{props.title}</h3>
      <NavbarBrand hidden={!props.isAuthorized === true}>
        <CountDown />
      </NavbarBrand>
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
          <NavLink href="https://github.com/Samuel-Davidsson">Github</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="pointer" onClick={Logout}>
            {" "}
            Logga ut
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
export default React.memo(HomePageNavBar);
