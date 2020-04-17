const express = require("express");
const morgan = require("morgan");
const db = require("./utils/db");
const dotenv = require("dotenv");

const app = express();

// add load .env
dotenv.config({ path: "./config/config.env" });

// connect DB
db.connectDB(process.env.MONGO_URI);

// using morgan read log when client call api
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  let ret = {
    msg: "hello shopping api",
  };
  res.json(ret);
});

app.use("/api/products", require("./routes/product.route"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
