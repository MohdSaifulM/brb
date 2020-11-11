require("dotenv").config();
const express = require("express");
const server = express();
//special import for connection to mongodb
require("./lib/connection");
//middleware
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(require("express-ejs-layouts"));

//middleware for routes
server.use("/students", require("./routes/student.routes")); //prefix students before routes
server.use("/brb", require("./routes/student.routes"));
//listening
server.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
