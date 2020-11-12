const router = require("express").Router();
const passport = require("../lib/passportConfig");
const Student = require("../models/student.models");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Sad to see you go!");
  res.redirect("/auth/login");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/register", async (req, res) => {
  console.log("before bcrypt", req.body);
  try {
    let { firstname, lastname, email, password } = req.body;

    // let passwordHash = await bcrypt.hash(password, saltRounds);

    let student = new Student({
      firstname,
      lastname,
      email,
      password, //: passwordHash,
    });

    await student.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }

  //   res.render("auth/register");
});
//default login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    successFlash: "Welcome to BRB",
    failureFlash: "Wrong details",
    // failureFlash: true,
  })
);

//custom login and redirect
// router.post("login", (req, res) => {
//   passport.authenticate("local", function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect("/login?info=" + info);
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }

//       return res.redirect("/");
//     });
//   })(req, res);
// });

module.exports = router;
