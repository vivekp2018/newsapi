import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../utils/authservice";
import { withRouter } from "react-router-dom";

function Navbar() {
  const isAuthenticated = authService.isAuthenticated();
  return (
    <div id="header">
      <div className="container">
        <div id="logo">
          <h1>
            <a href="test">News API </a>
          </h1>
          <span>Design by TEMPLATED</span>
        </div>
        <nav id="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isAuthenticated ? (
              <Fragment>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="active">
                    Register
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

/*function NavigationBar() {
  return (
    <div className="container-fluid">
      <div id="header">
        <Nav pills>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
}*/

export default withRouter(Navbar);
