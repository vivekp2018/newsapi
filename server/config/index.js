import devConfig from "./dev";
import prodConfig from "./prod";
let config;
if (process.env.NODE_ENV == "production") {
  config = prodConfig;
} else {
  config = devConfig;
}
export default config;
