import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import detectPort from "detect-port";
import setUpRoutes from "./routes";
import setUpCronJob from "./utils/cron";
import { connect } from "./utils/db";
import passport from "passport";
import { getLocalStrategy } from "./utils/auth";
import "express-async-errors";
import compression from "compression";
import path from "path";

async function startServer({ port = process.env.SERVER_PORT }) {
  port = port || (await detectPort(8888));
  const app = express();
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  passport.use(getLocalStrategy());
  setUpRoutes(app);
  if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }
  //setUpCronJob();
  await connect();
  return new Promise(resolve => {
    const server = app.listen(port, () => {
      console.log(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose);
        });
      };
      resolve(server);
    });
  });
}
export default startServer;
