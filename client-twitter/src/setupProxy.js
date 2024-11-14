const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://twitter-clone-sever.onrender.com",
      // "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
