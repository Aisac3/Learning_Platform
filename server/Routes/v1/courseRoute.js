const {
  create,
  listCourses,
  courseDetail,
  updateCourse,
  deleteCourse,
} = require("../../Controllers/courseController");
const authadmin = require("../../Middlewares/authAdmin");
const upload = require("../../Middlewares/multer");

const courseRouter = require("express").Router();

courseRouter.post("/create", authadmin, upload.single("image"), create);
courseRouter.get("/listcourses", listCourses);
courseRouter.get("/coursedetails/:courseId", courseDetail);
courseRouter.put("/update/:courseId", authadmin, upload.single("image"), updateCourse);
courseRouter.delete("/delete/:courseId", authadmin,deleteCourse);
module.exports = courseRouter;
