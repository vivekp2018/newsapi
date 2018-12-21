import React from "react";
import PropTypes from "prop-types";
import { stripHTML, trimContentToLength } from "../../utils/stringutilities";
function FeaturedItem({ article, category }) {
  return (
    <div className="4u">
      <h2>{category}</h2>
      <a href={article.url} target="_" className="image full">
        <img className="featuredimgae" src={article.urltoimage} alt="" />
      </a>
      <p>{trimContentToLength(stripHTML(article.content))}</p>
      <p>
        <a href={article.url} target="_" className="button">
          More Details
        </a>
      </p>
    </div>
  );
}
FeaturedItem.propTypes = {
  article: PropTypes.shape({
    url: PropTypes.string.isRequired,
    urltoimage: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })
};

export default FeaturedItem;
