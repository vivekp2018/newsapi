import React from "react";
import { stripHTML, trimContentToLength } from "../../utils/stringutilities";
import PropTypes from "prop-types";
export default function FooterCategory(props) {
  return (
    <div className="4u">
      <section>
        <h2>{props.articles[0].category}</h2>
        <ul className="default">
          {props.articles.map(article => {
            return (
              <li key={article._id}>
                <a href={article.url}>
                  {trimContentToLength(stripHTML(article.description, 100))}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
FooterCategory.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};
