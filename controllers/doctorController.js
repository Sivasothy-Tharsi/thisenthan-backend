const Doctor = require("../models/doctorModel")
const User = require("../models/userModel")
const Notification = require("../models/notificationModel");

const applyfordoctor = async (req, res) => {
    try {
      const alreadyFound = await Doctor.findOne({ userId: req.locals });
      if (alreadyFound) {
        return res.status(400).send("Application already exists");
      }
  
      const doctor = Doctor({ ...req.body.formDetails, userId: req.locals });
      const result = await doctor.save();
  
      return res.status(201).send("Application submitted successfully");
    } catch (error) {
      res.status(500).send("Unable to submit application");
    }
  };

  const rejectdoctor = async (req, res) => {
    try {
      const details = await User.findOneAndUpdate(
        { _id: req.body.id },
        { isDoctor: false, status: "rejected" }
      );
      const delDoc = await Doctor.findOneAndDelete({ userId: req.body.id });
  
      const notification = await Notification({
        userId: req.body.id,
        content: `Sorry, Your application has been rejected.`,
      });
  
      await notification.save();
  
      return res.status(201).send("Application rejection notification sent");
    } catch (error) {
      res.status(500).send("Error while rejecting application");
    }
  };

  module.exports = {
    applyfordoctor,
    rejectdoctor
  }