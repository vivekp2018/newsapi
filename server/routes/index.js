import express from "express";
import setUpArticleRoutes from "./articles";
import setupAuthRoutes from "./auth";
import setUpSettingsRoutes from "./settings";
function setupRoutes(app) {
  const authRouter = express.Router();
  setupAuthRoutes(authRouter);
  app.use("/api/auth", authRouter);

  const articleRouter = express.Router();
  setUpArticleRoutes(articleRouter);
  app.use("/api/articles", articleRouter);

  const settingRouter = express.Router();
  setUpSettingsRoutes(settingRouter);
  app.use("/api/settings", settingRouter);
}
export default setupRoutes;
