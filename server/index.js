require("dotenv").config();
require('express-async-errors')
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/connectDb");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");

const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json()); // it let our app receive and parse the json data;
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/api/auth", require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      message: "404 not found",
    });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no} : ${err.code}\t ${err.syscall}\t ${err.hostname}`,
    "mongoErrLog.log"
  );
});

