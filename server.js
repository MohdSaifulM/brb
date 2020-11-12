require("dotenv").config();
const express = require("express");
const server = express();
const session = require("express-session");
const passport = require("./lib/passportConfig");
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
    // cookie: { },
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//middleware for routes
server.get("/", (req, res) => {
  res.redirect("/dashboard");
});
server.use("/students", require("./routes/student.routes")); //prefix students before routes
server.use("/excuse", require("./routes/excuse.routes")); //prefix students before routes
server.use("/dashboard", require("./routes/dashboard.routes"));
//auth routes starts here
server.use("/auth", require("./routes/auth.routes"));

//listening
server.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
