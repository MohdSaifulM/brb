const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  student_num: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort",
  },
  excuses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Excuse",
    },
  ],
});

studentSchema.methods.fullName = function () {
  return this.firstname + " " + this.lastname;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
// module.exports = Course;
