const mongoose = require("mongoose");
const IllnessHospital = require("../models/IllnessHospital");
const Illness = require("../models/Illness");
const Hospital = require("../models/Hospital");

let illnessHospitalController = {};
let isAdmin = false;

// Show list of illnesshospital
illnessHospitalController.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  IllnessHospital.find({}).exec(function (err, illnesshospitals) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/illnesshospitals/index", {illnesshospitals: illnesshospitals, admin: isAdmin});
    }
  });
};

// Show illnesshospital by id
illnessHospitalController.show = function(req, res) {
  let isAdmin = (req.user.role === 'admin');
  IllnessHospital.findOne({_id: req.params.id}).exec(function (err, illnesshospital) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // console.log(commitment.illness)
      console.log("isAdmin = " + isAdmin);
      res.render("../views/illnesshospitals/show", {illnesshospital: illnesshospital, admin: isAdmin});
    }
  });
};

// Create new illnesshospital
illnessHospitalController.create = function(req, res) {
  Hospital.find({}).exec(function (err, hospitals) {
    Illness.find({}).exec(function (err, illnesses) {
      if (err) {
        console.log("Error:", err);
      } else {
        res.render("../views/illnesshospitals/create", {illnesses, hospitals});
      }
    });
  });
};

// Save new illnesshospital
illnessHospitalController.save = function(req, res) {
  // console.log("req.user = " + req.user);
  let illnesshospital = new IllnessHospital({
    illness_id: req.body.illness_id,
    hospital_id: req.body.hospital_id
  });

  illnesshospital.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/illnesshospitals/create");
    } else {
      console.log("Successfully created an illnesshospital.");
      res.redirect("/illnesshospitals/show/"+illnesshospital._id);
    }
  });
};

// Edit an illnesshospital
illnessHospitalController.edit = function(req, res) {
  IllnessHospital.findOne({_id: req.params.id}).exec(function (err, illnesshospital) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/illnesshospitals/edit", {illnesshospital: illnesshospital});
    }
  });
};

// Delete an illnesshospital
illnessHospitalController.delete = function(req, res) {
  IllnessHospital.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("illnesshospital deleted!");
      res.redirect("/illnesshospitals");
    }
  });
};

module.exports = isAdmin;
module.exports = illnessHospitalController;
