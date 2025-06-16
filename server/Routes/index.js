const V1router = require("./v1");

const apiRouter = require("express").Router();

apiRouter.use("/v1", V1router);

module.exports = apiRouter;
