import React, { Component, Fragment } from "react";
import { authService } from "../../utils/authservice";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    authService
      .login(this.state.username, this.state.password)
      .then(data => this.props.history.push("/"))
      .catch(err => {
        this.setState(error => {
          const errorkey = Object.keys(err.response.data.errors);
          const errorval = Object.values(err.response.data.errors);
          const msg = errorkey[0] + " " + errorval[0];
          return { error: msg };
        });
      });

    event.preventDefault();
  };

  render() {
    return (
      <div id="main">
        <div className="container">
          <div className="row">
            <div className="marginleft33">
              <h1>Login</h1>
            </div>
          </div>

          {this.state.error ? (
            <Fragment>
              <div className="row">&nbsp;</div>
              <div className="row marginleft40" style={{ color: "red" }}>
                {this.state.error}
              </div>
            </Fragment>
          ) : (
            ""
          )}
          <div className="row">
            <div className="marginleft33">Username :</div>
            <div className="cols-md-4">
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="marginleft33">Password : </div>
            <div className="cols-md-4">
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="marginleft40" />
            <div className="cols-md-4">
              <input
                className="btnlogin"
                type="button"
                name="button"
                value="Login"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
