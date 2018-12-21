import * as settingsController from "../controllers/settings";
import { authMiddleware } from "../utils/auth";

function setUpSettingsRoutes(router) {
  router
    .route("/")
    .post(authMiddleware.required, settingsController.addSettings);
}

export default setUpSettingsRoutes;
