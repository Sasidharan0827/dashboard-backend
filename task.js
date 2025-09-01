require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const approute = require("./routes/app.routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const allowedOrigins = ["http://localhost:4200"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME}`);
});
app.use("/dashboard", approute);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("MongoDB Atlas connected");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });
