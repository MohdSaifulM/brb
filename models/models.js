const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  course: { type: String, required: true },
  cohort_id: { type: Number, required: true },
});

const studentSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  cohort: courseSchema,
});

const Student = mongoose.model("Student", studentSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { Student, Course };
// module.exports = Course;
