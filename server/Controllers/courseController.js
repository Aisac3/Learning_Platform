const { image } = require("../Config/cloudinaryConfig");
const courseDb = require("../Models/courseModel");
const uploadToCloudinary = require("../Utilities/imageUpload");

const create = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;
    if (!title || !description || !price || !duration) {
      res.status(400).json({ error: "All fields are required" });
    }
    //console.log(req.file,"image uploaded by multer ")
    if (!req.file) {
      res.status(400).json({ error: "image not found" });
    }
    const cloudinaryRes = await uploadToCloudinary(req.file.path);
    console.log(cloudinaryRes, "image uploaded by cloudinary");

    const newCourse = new courseDb({
      title,
      description,
      price,
      duration,
      image: cloudinaryRes,
    });
    let savedCourse = await newCourse.save();
    if (savedCourse) {
      return res.status(200).json({ message: "Course added", savedCourse });
    }
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const listCourses = async (req, res) => {
  try {
    const courseList = await courseDb.find();

    res.status(200).json(courseList);
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const courseDetail = async (req, res) => {
  try {
    const { courseId } = req.params;

    const courseDetails = await courseDb.findById({ _id: courseId });

    if (!courseDetail) {
      return res.status(400).json({ error: "course not found" });
    }
    return res.status(200).json(courseDetails);
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, price, duration } = req.body;
    let ImageUrl;

    let CourseExists = await courseDb.findById(courseId);
    if (!CourseExists) {
      return res.status(400).json({ erro: "Course not found" });
    }
    if (req.file) {
      const cloudinaryRes = await uploadToCloudinary(req.file.path);
      ImageUrl = cloudinaryRes;
    }

    const updatedCourse = await courseDb.findByIdAndUpdate(
      courseId,
      { title, description, price, duration, image: ImageUrl },
      { new: true }
    );
    res.status(200).json({ message: "course Updated", updatedCourse });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await courseDb.findByIdAndDelete(courseId);

    if (!deleteCourse) {
      return res.status(400).json({ error: "course not found" });
    }
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
module.exports = {
  create,
  listCourses,
  courseDetail,
  updateCourse,
  deleteCourse,
};
