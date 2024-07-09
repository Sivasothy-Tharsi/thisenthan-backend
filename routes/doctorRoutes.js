const express = require("express");
const doctorController = require("../controllers/doctorController");
const auth = require("../middleware/auth");


const doctorRouter = express.Router();

doctorRouter.post("/applyfordoctor", auth, doctorController.applyfordoctor);
doctorRouter.put("/rejectdoctor", auth, doctorController.rejectdoctor);

module.exports = doctorRouter;
