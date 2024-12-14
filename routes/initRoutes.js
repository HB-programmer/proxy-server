const { verifyToken } = require("../middlewares/authMiddleware");
const authRoutes = require("./authRoutes");
const proxyRoutes = require("./proxyRoutes");

const intiRoutes = (app) => {
    app
      .use("/api/auth", authRoutes)
      .use("/api/proxy",verifyToken, proxyRoutes);
  };
  
  module.exports = intiRoutes;