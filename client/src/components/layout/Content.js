import React from "react";

import PropTypes from "prop-types";
function Content({ item }) {
  return (
    <div id="content" className="8u skel-cell-important">
      <section>
        <header>
          <h2>Top Headline</h2>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

          <div>&nbsp;</div>
          <span className="byline">{item.description}</span>
        </header>
        <a href={item.url} className="image full" target="_">
          <img src={item.urltoimage} alt="sample" />
          <p>{item.content}</p>
        </a>

        {/*<p className="posted" style={{ textAlign: "right" }}>
          {item.author}
        </p>
        <p className="posted" style={{ textAlign: "right" }}>
          {item.publishedAt}
  </p>*/}
      </section>
    </div>
  );
}
Content.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    urltoimage: PropTypes.string.isRequired
  })
};

export default Content;
