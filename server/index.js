const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require("./Routes");
require("dotenv").config(); // Load environment variables
const cookieparser=require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: "http://localhost:5173", // or use "*" for development (not safe in production)
  credentials: true,               // if using cookies or auth headers
}));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.use("/api", apiRouter);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
