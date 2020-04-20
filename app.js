const express = require("express");
const morgan = require("morgan");
const db = require("./utils/db");
const dotenv = require("dotenv");
const cors = require("cors");
// package throw err in asycn func
require("express-async-errors");

const verify = require("./middlewares/auth.mdw");

const app = express();

// add load .env
dotenv.config({ path: "./config/config.env" });

// connect DB
db.connectDB(process.env.MONGO_URI);

// using morgan read log when client call api
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  let ret = {
    msg: "hello shopping api",
  };
  res.json(ret);
});

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/products", verify, require("./routes/product.route"));

// route defauld
app.use((req, res, next) => {
  res.status(404).send("NOT FOUND");
});

// error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).send("View error log on console.");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
