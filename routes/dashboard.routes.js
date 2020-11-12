const router = require("express").Router();
const Student = require("../models/student.models");
const Excuse = require("../models/excuse.models");

router.get("/", async (req, res) => {
  try {
    console.log(req.user);
    let excuses = await Excuse.find().populate({
      path: "student",
      model: Student,
      // select: "firstname student_num",
      populate: {
        path: "cohort",
        select: "course",
      },
    });

    let ex = await Excuse.aggregate([
      {
        $group: {
          // _id: "$createdAt",
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          allexcuses: {
            $push: {
              location: "$location",
              description: "$description",
              _id: "$_id",
              student: "$student",
            },
          },
        },
      },
    ]);
    let students = await Student.find();
    // console.log(JSON.stringify(ex[1]));
    res.render("dashboard/index", { students, excuses, ex });
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
