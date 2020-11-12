const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

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

studentSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

  var hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;
  next();
});

studentSchema.methods.fullName = function () {
  return this.firstname + " " + this.lastname;
};

studentSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
// module.exports = Course;
