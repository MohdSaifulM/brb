require("dotenv").config();
const express = require("express");
const server = express();
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./lib/passportConfig");
const usercheck = require("./lib/usercheck");
//special import for connection to mongodb
require("./lib/connection");
//middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(require("express-ejs-layouts"));

server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 4000000 },
  })
);

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash(); //stores all flash messages for ejs access
  next();
});

//middleware for routes
server.get("/", (req, res) => {
  res.redirect("/dashboard");
});
server.use("/students", require("./routes/student.routes")); //prefix students before routes
server.use("/excuse", require("./routes/excuse.routes")); //prefix students before routes
server.use("/dashboard", usercheck, require("./routes/dashboard.routes"));
//auth routes starts here
server.use("/auth", require("./routes/auth.routes"));

//listening
server.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
