const mongoose = require("mongoose");
const { Schema } = mongoose;
const excuseSchema = new Schema(
  {
    location: String,
    description: { type: String, required: true },
    endOfExcuse: Date,
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  },
  { timestamps: true }
);
const Excuse = mongoose.model("Excuse", excuseSchema);

module.exports = Excuse;
