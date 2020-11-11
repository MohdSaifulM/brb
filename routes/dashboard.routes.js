const router = require("express").Router();
const { Student } = require("../models/student.models");
const Excuse = require("../models/excuse.models");

router.get("/", async (req, res) => {
  try {
    let excuses = await Excuse.find().populate("student");
    let students = await Student.find();
    // console.log(excuses);
    res.render("dashboard/index", { students, excuses });
  } catch (error) {
    console.log(error);
    console.log("nothing");
  }
});

router.post("/", async (req, res) => {
  try {
    let excuseData = {
      location: req.body.location,
      description: req.body.description,
      student: req.body.students,
    };
    //excuse data saved
    let excuse = new Excuse(excuseData);
    let savedExcuse = await excuse.save();

    //find student
    let student = await Student.findById(req.body.students);
    student.excuses.push(excuse._id);
    await student.save();

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    console.log("nothing");
  }
});

module.exports = router;
