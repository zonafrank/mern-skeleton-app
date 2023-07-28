import config from "../config/config";

import path from "path";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
mongoose.Promise = global.Promise;
// import { MongoClient } from "mongodb";
import app from "./express";

const CURRENT_WORKING_DIR = process.cwd();

mongoose
  .connect(config.mongoUri)
  .then((dbRes) => {
    console.log("*** CONNECTED TO DATABASE***");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

let PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server started on port ${PORT}`);
  }
});
