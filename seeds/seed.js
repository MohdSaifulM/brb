require("dotenv").config();
require("../lib/connection");
const Student = require("../models/models");

Student.insertMany([
  {
    firstname: "Bagels",
    lastname: "Potato",
    cohort: {
      course: "SEI",
      cohort_id: 25,
    },
  },
  {
    firstname: "Bagels2",
    lastname: "Potato2",
    cohort: {
      course: "SEI",
      cohort_id: 25,
    },
  },
])
  .then((suc) => {
    console.log("successfully added!");
  })
  .catch((e) => {
    console.log(e);
  });
