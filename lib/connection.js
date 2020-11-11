const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongodb connected!");
    }
  }
);
