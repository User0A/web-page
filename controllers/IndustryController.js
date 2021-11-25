const mongoose = require("mongoose");
const Industry = require("../models/Industry");

let industryController = {};

let isAdmin = false;
// Show list of industries
industryController.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Industry.find({}).exec(function (err, industries) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/industries/index", {industries: industries, admin: isAdmin});
    }
  });
};

// Show employee by id
industryController.show = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Industry.findOne({_id: req.params.id}).exec(function (err, industry) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/industries/show", {industry: industry, admin: isAdmin});
    }
  });
};

// Create new employee
industryController.create = function(req, res) {
  res.render("../views/industries/create");
};

// Save new employee
industryController.save = function(req, res) {
  isAdmin = (req.user.role === "admin");
  var industry = new Industry(req.body);

  industry.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/industries/create");
    } else {
      console.log("Successfully created an industry.");
      res.redirect("/industries/show/"+industry._id);
    }
  });
};

// Edit an industry
industryController.edit = function(req, res) {
  isAdmin = (req.user.role === "admin");
  if(!isAdmin){
    return res.redirect('/dashboard');
  }
  Industry.findOne({_id: req.params.id}).exec(function (err, industry) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      return res.render("../views/industries/edit", {industry: industry});
    }
  });
};

// Update an industry
industryController.update = function(req, res) {
  Industry.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name }}, { new: true }, function (err, industry) {
    if (err) {
      console.log(err);
     return res.render("../views/industries/edit", {industry: req.body});
    }
    return res.redirect("/industries/show/"+industry._id);
  });
};

// Delete an industry
industryController.delete = function(req, res) {
  Industry.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Industry deleted!");
      res.redirect("/industries");
    }
  });
};

module.exports = industryController;
