import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import SidebarItem from "./SidebarItem";
class Sidebar extends Component {
  state = {
    items: []
  };
  componentDidMount() {
    axios({
      method: "GET",
      url: `${config.BASE_URL}/api/articles/latest`
    }).then(response => {
      if (response.data && response.data.length > 0) {
        const sideItems = response.data;
        //setItem(sideItems);
        this.setState({ items: sideItems });
      }
    });
  }
  render() {
    const item = this.state.items;
    return (
      <div id="sidebar" className="4u">
        <section>
          <header>
            <h2>Latest News</h2>
          </header>
          <ul className="style">
            {item.map(item => {
              return <SidebarItem key={item.url} {...item} />;
            })}
          </ul>
        </section>
      </div>
    );
  }
}

export default Sidebar;
