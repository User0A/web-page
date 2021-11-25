const mongoose = require("mongoose");
const Illness = require("../models/Illness");

let illnessController = {};

let isAdmin = false;
// Show list of illnesses
illnessController.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Illness.find({}).exec(function (err, illnesses) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/illnesses/index", {illnesses: illnesses, admin: isAdmin});
    }
  });
};

// Show employee by id
illnessController.show = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Illness.findOne({_id: req.params.id}).exec(function (err, illness) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/illnesses/show", {illness: illness, admin: isAdmin});
    }
  });
};

// Create new employee
illnessController.create = function(req, res) {
  res.render("../views/illnesses/create");
};

// Save new employee
illnessController.save = function(req, res) {
  isAdmin = (req.user.role === "admin");
  var illness = new Illness(req.body);

  illness.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/illnesses/create");
    } else {
      console.log("Successfully created an illness.");
      res.redirect("/illnesses/show/"+illness._id);
    }
  });
};

// Edit an illness
illnessController.edit = function(req, res) {
  isAdmin = (req.user.role === "admin");
  if(!isAdmin){
    return res.redirect('/dashboard');
  }
  Illness.findOne({_id: req.params.id}).exec(function (err, illness) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      return res.render("../views/illnesses/edit", {illness: illness});
    }
  });
};

// Update an illness
illnessController.update = function(req, res) {
  Illness.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, symptoms: req.body.symptoms, healing: req.body.healing }}, { new: true }, function (err, illness) {
    if (err) {
      console.log(err);
     return res.render("../views/illnesses/edit", {illness: req.body});
    }
    return res.redirect("/illnesses/show/"+illness._id);
  });
};

// Delete an illness
illnessController.delete = function(req, res) {
  Illness.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Illness deleted!");
      res.redirect("/illnesses");
    }
  });
};

module.exports = illnessController;
