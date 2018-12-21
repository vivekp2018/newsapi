export default {
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BASE_URL
      : "http://localhost:8888"
};
