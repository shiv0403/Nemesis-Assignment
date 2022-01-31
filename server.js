require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

//connect to mongodb
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to mongodb!");
  }
});

//middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieParser());
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

const authRoutes = require("./routes/authrRoutes");
const dataRoutes = require("./routes/dataRoutes");
const { checkUser } = require("./middlewares/authMiddleware");

app.use("*", checkUser);
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

// app.get("/", (req, res) => {
//   res.status(200).send("<h1>This is home route</h1>");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("nemesis/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "nemesis", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
