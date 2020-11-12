const router = require("express").Router();
const Student = require("../models/student.models");
const Excuse = require("../models/excuse.models");

router.get("/:id", async (req, res) => {
  try {
    let excuse = await Excuse.findById(req.params.id).populate({
      path: "student",
      model: Student,
      // select: "firstname student_num",
      populate: {
        path: "cohort",
        select: "course",
      },
    });
    res.render("excuses/show", { excuse });
  } catch (error) {
    console.log(error);
    console.log("nothing");
  }
});

module.exports = router;
