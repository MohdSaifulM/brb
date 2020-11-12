const router = require("express").Router();
const Student = require("../models/student.models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  console.log("before bcrypt", req.body);
  try {
    let { firstname, lastname, email, password } = req.body;

    let passwordHash = await bcrypt.hash(password, saltRounds);

    let student = new Student({
      firstname,
      lastname,
      email,
      password: passwordHash,
    });

    await student.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }

  //   res.render("auth/register");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
module.exports = router;
