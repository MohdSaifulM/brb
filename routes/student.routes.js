const Student = require("../models/student.models");
const Cohort = require("../models/cohort.models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    let student = await (
      await Student.findById("5fab5297b2363b180cf95f39")
    ).populate("cohort");
    console.log(student);
    res.render("students/index");
  } catch (error) {
    console.log(error);
  }
});

router.get("/students", (req, res) => {
  res.render("students/index");
});

module.exports = router;
