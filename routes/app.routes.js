const express = require("express");
const router = express.Router();
const user = require("../routes/user.routes");
const order = require("./product.route");

router.use("/user", user);
router.use("/product", order);
module.exports = router;
