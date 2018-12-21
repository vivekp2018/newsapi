import React, { Component } from "react";
import config from "../../config";
import axios from "axios";
import FooterCategory from "./FooterCategory";
const url = `${config.BASE_URL}/api/articles/selectedcategories`;
class Footer extends Component {
  state = {
    articles: ""
  };
  componentDidMount() {
    return axios({
      method: "GET",
      url
    })
      .then(response => {
        this.setState(() => {
          return { articles: response.data };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="footer">
        <div className="container">
          <div className="row">
            {Object.values(this.state.articles).length > 0
              ? Object.values(this.state.articles).map((article, index) => {
                  return <FooterCategory key={index} articles={article} />;
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
