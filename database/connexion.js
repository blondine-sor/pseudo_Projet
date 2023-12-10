const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://user:pass@127.0.0.1:27017/Belle?readPreference=primary&ssl=false&directConnection=true"
  )
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));
