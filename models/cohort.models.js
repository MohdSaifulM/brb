const mongoose = require("mongoose");
const { Schema } = mongoose;

const cohortSchema = new Schema({
  course: { type: String, required: true },
  cohort_id: { type: Number, required: true },
});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
