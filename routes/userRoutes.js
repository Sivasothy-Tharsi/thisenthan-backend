const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const userRouter = express.Router();



userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

userRouter.delete('/deleteuser', auth, userController.deleteuser);

userRouter.get('/getallusers', auth, userController.getallusers);

userRouter.get('getuser/:id', auth, userController.getuser);

userRouter.put('updateprofile', auth, userController.updateprofile);

module.exports = userRouter;
