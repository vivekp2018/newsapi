import cron from "node-cron";
import Article from "../models/article";
import { Categories } from "./types";
import NewsAPI from "newsapi";
import config from "../config";

const newsapi = new NewsAPI(config.API_KEY);

function insertArticles(articles, category = Categories.Topheadline) {
  let promises = articles.map(article => {
    let doc = {
      category,
      source: article.source.name,
      author: article.author,
      description: article.description,
      url: article.url,
      urltoimage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content
    };
    return Article.create(doc)
      .then(data => {
        console.log("successfully updated");
      })
      .catch(err => {
        console.log(err.message);
      });
  });
  return promises;
}
function categoryNewsCron(category) {
  //return new Promise((resolve, reject) => {
  cron.schedule("*/20 * * * *", () => {
    console.log("running every minute 15 for category" + category);
    Article.remove({ category })
      .then(() => {
        newsapi.v2
          .topHeadlines({
            category,
            language: "en",
            country: "us"
          })
          .then(response => {
            if (response.articles && response.articles.length > 0) {
              let promises = insertArticles(response.articles, category);
              Promise.all(promises)
                .then(() => console.log("cron completed successfully "))
                .catch(err => {
                  console.log("failed", err);
                });
              //resolve(promises);
            }
          });
      })
      .catch(err => {
        console.log(err);
        // reject(err);
      });
  });
  // });
}

function topNewsDataCron() {
  cron.schedule("*/10 * * * *", () => {
    console.log("running a task every 5 minute");
    Article.remove({ category: Categories.Topheadline })
      .then(() => {
        newsapi.v2
          .topHeadlines({
            language: "en",
            country: "us"
          })
          .then(response => {
            console.log(response.articles);
            if (response.articles && response.articles.length > 0) {
              let promises = insertArticles(response.articles);
              Promise.all(promises).then(() =>
                console.log("cron completed successfully")
              );
            }
          });
      })
      .catch(err => console.log(err));
  });
}

function setUpCronJob() {
  topNewsDataCron();
  const categories = Object.values(Categories);
  categories.map(category => {
    categoryNewsCron(category);
  });
}

export default setUpCronJob;
