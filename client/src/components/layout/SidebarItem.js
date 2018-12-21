import React from "react";
import PropTypes from "prop-types";

export default function SidebarItem(props) {
  return (
    <li>
      <a href={props.url} target="_">
        <p className="posted">{props.publishedAt}</p>
        <img src={props.urltoimage} alt="" style={{ width: 100, height: 30 }} />
        <p className="text">{props.description}</p>
      </a>
    </li>
  );
}
SidebarItem.propTypes = {
  url: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
