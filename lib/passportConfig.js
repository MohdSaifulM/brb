var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const Student = require("../models/student.models");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Student.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    Student.findOne({ email: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

module.exports = passport;
