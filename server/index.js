import startServer from "./start";
const isProduction = process.env.NODE_ENV === "production";

startServer({
  port: isProduction ? process.env.PORT : undefined
});
