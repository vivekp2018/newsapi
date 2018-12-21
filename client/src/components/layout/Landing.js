import Sidebar from "./Sidebar";
import Content from "./Content";
import config from "../../config";
import axios from "axios";
import React, { Component } from "react";
const url = `${config.BASE_URL}/api/articles/headline`;
class Landing extends Component {
  state = {
    headline: ""
  };
  componentDidMount() {
    return axios({
      method: "GET",
      url
    })
      .then(response => {
        this.setState(() => {
          return { headline: response.data };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div id="main">
        <div className="container">
          <div className="row">
            <Sidebar />
            {this.state.headline ? (
              <Content item={this.state.headline} />
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
