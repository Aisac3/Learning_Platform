const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  courses: [
    {
      courseId: {
        type: mongoose.Types.ObjectId,
        ref: "courses",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalprice: {
    type: Number,
    required: true,
    default: 0,
  },
});

cartSchema.methods.calculateTotalPrice = function () {
  this.totalprice = this.courses.reduce((total, course) => total + course.price, 0);
};

module.exports = new mongoose.model("carts", cartSchema);
