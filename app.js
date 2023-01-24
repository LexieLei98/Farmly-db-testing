const express = require("express");

const FarmRoutes = require("./routes/farm.routes");
const {handle404Routes, handle500Error} = require("./error-handling");
const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());

/* This is the root route. It is used to check if the server is running. */
app.get("/", (req, res) => {
  res.status(200).json({ alive: "True" });
});

/* Telling the server to use the routes in the ProductRoutes file. */
app.use("/api", FarmRoutes);
app.use("/api", handle500Error)
app.all('*', handle404Routes);

module.exports = app