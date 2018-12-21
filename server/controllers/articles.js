import Article from "../models/article";
import { Categories } from "../utils/types";

//error cases handled by express async errors
async function getLatestArticles(req, res) {
  const articleCount = req.query && req.query.count > 0 ? req.query.count : 4;
  const articles = await Article.aggregate([
    { $match: { category: Categories.Topheadline } },
    { $limit: articleCount },
    { $sort: { publishedAt: 1 } },
    {
      $project: {
        _id: 0,
        source: 1,
        description: 1,
        url: 1,
        urltoimage: 1,
        publishedAt: 1,
        content: 1
      }
    }
  ]);
  return res.status(200).send(articles);
}

async function getArticles(req, res) {
  const articleType = req.params.articletype;
  const categories = Object.values(Categories);
  const articleCount = req.query && req.query.count > 0 ? req.query.count : 10;
  if (categories.includes(articleType)) {
    const articles = await Article.aggregate([
      { $match: { category: Categories.Topheadline } },
      { $limit: articleCount },
      { $sort: { publishedAt: 1 } },
      {
        $project: {
          _id: 0,
          source: 1,
          description: 1,
          url: 1,
          urltoimage: 1,
          publishedAt: 1,
          content: 1
        }
      }
    ]);
    return res.status(200).send(articles);
  } else {
    return res.status(404).send({ msg: "invalid category" });
  }
}

async function getHeadline(req, res) {
  const article = await Article.find({
    category: Categories.Topheadline,
    urltoimage: { $ne: null }
  })
    .sort({ publishedAt: -1 })
    .limit(1);

  return res.status(200).send(article[0]);
}

async function getfeaturedArticles(req, res) {
  const featuredArticles = await Article.aggregate([
    {
      $match: {
        category: {
          $in: [
            Categories.Business,
            Categories.Entertainment,
            Categories.Sports
          ]
        }
      }
    },
    {
      $group: {
        _id: "$category",
        category: { $first: "$category" },

        data: {
          $first: {
            description: "$description",
            content: "$content",
            url: "$url",
            urltoimage: "$urltoimage"
          }
        }
      }
    }
  ]);
  return res.json(featuredArticles);
}

async function getSelectedCategories(req, res) {
  const articles = {
    science: "",
    technology: "",
    health: ""
  };

  const scienceArticles = await Article.find({
    category: Categories.Science,
    urltoimage: { $ne: null }
  })
    .select("url description category")
    .sort({ publishedAt: -1 })
    .limit(5);
  articles.science = scienceArticles;

  const techArticles = await Article.find({
    category: Categories.Technology,
    urltoimage: { $ne: null }
  })
    .select("url description category")
    .sort({ publishedAt: -1 })
    .limit(5);
  articles.technology = techArticles;
  const healthArticles = await Article.find({
    category: Categories.Health,
    urltoimage: { $ne: null }
  })
    .select("url description category")
    .sort({ publishedAt: -1 })
    .limit(5);
  articles.health = healthArticles;
  return res.status(200).send(articles);
}

export {
  getLatestArticles,
  getArticles,
  getHeadline,
  getfeaturedArticles,
  getSelectedCategories
};
