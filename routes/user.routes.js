const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/user.controller");
router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.put("/update/:userId", usercontroller.updateUser);
router.delete("/delete/:userId", usercontroller.deleteUser);
router.get("/list", usercontroller.userList);
router.get("/get/:userId", usercontroller.getUserById);
router.get("/search", usercontroller.searchUsers);

module.exports = router;
