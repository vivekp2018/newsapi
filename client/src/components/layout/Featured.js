import FeaturedItem from "./FeaturedItem";
import React, { Component } from "react";
import axios from "axios";
import config from "../../config";

const url = `${config.BASE_URL}/api/articles/featured`;

class Featured extends Component {
  state = {
    articles: []
  };
  componentDidMount = () => {
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
  };

  render() {
    return (
      <div id="featured">
        <div className="container">
          <div className="row">
            {this.state.articles &&
              this.state.articles.map(article => {
                return (
                  <FeaturedItem
                    key={article.category}
                    article={article.data}
                    category={article.category}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
export default Featured;
