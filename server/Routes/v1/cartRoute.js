const {addtocart, removeFromCart} = require("../../Controllers/cartController");
const {getCart}=require('../../Controllers/cartController')
const authuser = require("../../Middlewares/authUser");

const cartRouter = require("express").Router();

cartRouter.post("/addtocart/:courseId",authuser, addtocart);
cartRouter.get("/getcart",authuser, getCart);
cartRouter.delete("/removefromcart/:courseId",authuser, removeFromCart);

module.exports = cartRouter;
