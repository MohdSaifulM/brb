const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("students/index");
});

router.get("/students", (req, res) => {
  res.render("students/index");
});

module.exports = router;
