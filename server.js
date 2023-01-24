const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 3000;

require("dotenv").config();

/* Connecting to the database and then starting the server. */
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, console.log("Server started on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });