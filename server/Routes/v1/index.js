const adminRouter = require("./adminRoute");
const courseRouter = require("./courseRoute");
const userRouter = require("./userRoute");

const V1router = require("express").Router();

V1router.use("/user", userRouter);
V1router.use('/admin',adminRouter);
V1router.use('/course',courseRouter);

module.exports = V1router;
