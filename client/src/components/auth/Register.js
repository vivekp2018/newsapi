import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";

const url = `${config.BASE_URL}/api/auth/register`;

export default class Register extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    validLogin: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    axios
      .post(url, {
        username: this.state.username,
        password: this.state.password
      })
      .then(data => {
        console.log(data);
        this.setState({
          validLogin: true,
          username: "",
          password: "",
          error: ""
        });
      })
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
              <h1>Register</h1>
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
          {this.state.validLogin ? (
            <Fragment>
              <div className="row">&nbsp;</div>

              <div className="marginleft40" style={{ color: "green" }}>
                User successFully Registered.Please log in &nbsp;
                <Link to="/login" style={{ textDecoration: "underline" }}>
                  <b>here</b>
                </Link>
                <div className="row">&nbsp;</div>
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
                value="Register"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
