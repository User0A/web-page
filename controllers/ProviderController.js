const mongoose = require("mongoose");
const Provider = require("../models/Provider");

let providerController = {};

let isAdmin = false;
// Show list of providers
providerController.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Provider.find({}).exec(function (err, providers) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/providers/index", {providers: providers, admin: isAdmin});
    }
  });
};

// Show employee by id
providerController.show = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Provider.findOne({_id: req.params.id}).exec(function (err, provider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/providers/show", {provider: provider, admin: isAdmin});
    }
  });
};

// Create new employee
providerController.create = function(req, res) {
  res.render("../views/providers/create");
};

// Save new employee
providerController.save = function(req, res) {
  isAdmin = (req.user.role === "admin");
  var provider = new Provider(req.body);

  provider.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/providers/create");
    } else {
      console.log("Successfully created an provider.");
      res.redirect("/providers/show/"+provider._id);
    }
  });
};

// Edit an provider
providerController.edit = function(req, res) {
  isAdmin = (req.user.role === "admin");
  if(!isAdmin){
    return res.redirect('/dashboard');
  }
  Provider.findOne({_id: req.params.id}).exec(function (err, provider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      return res.render("../views/providers/edit", {provider: provider});
    }
  });
};

// Update an provider
providerController.update = function(req, res) {
  Provider.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, budget: req.body.budget }}, { new: true }, function (err, provider) {
    if (err) {
      console.log(err);
     return res.render("../views/providers/edit", {provider: req.body});
    }
    return res.redirect("/providers/show/"+provider._id);
  });
};

// Delete an provider
providerController.delete = function(req, res) {
  Provider.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Provider deleted!");
      res.redirect("/providers");
    }
  });
};

module.exports = providerController;
