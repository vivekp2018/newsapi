import * as articleController from "../controllers/articles";

function setUpArticleRoutes(router) {
  router.get("/latest", articleController.getLatestArticles);
  router.get("/selectedcategories", articleController.getSelectedCategories);
  router.get("/headline", articleController.getHeadline);
  router.get("/featured", articleController.getfeaturedArticles);
  router.get("/:articletype/", articleController.getArticles);
}
export default setUpArticleRoutes;
